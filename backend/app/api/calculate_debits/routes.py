from uuid import UUID

from fastapi import Depends
from fastapi import HTTPException
import pydantic
import requests
from sqlmodel import select
from sqlmodel import Session

from app.api.auth.deps import BearerAuth
from app.api.auth.deps import get_current_user
from app.core.db import engine
from app.models.event import Event
from app.models.user import User
from app.utils.telegram import send_telegram_message

from .routers import calculate_debits_router


class Debt(pydantic.BaseModel):
    from_user_id: int
    to_user_id: int
    amount: float


@calculate_debits_router.post(
    '/events/{event_id}',
    description='Get debts smeta',
    dependencies=[Depends(BearerAuth())],
)
def calculate_event_debts(
    event_id: UUID, user: User = Depends(get_current_user)
) -> list[Debt]:
    with Session(engine) as session:
        result = session.execute(select(Event).where(Event.id == event_id))
        event = result.scalars().first()

        if not event:
            raise HTTPException(status_code=404, detail='Event not found')

        if user.id != event.owner_id:
            raise HTTPException(status_code=403, detail='Permission denied')

        transactions = []
        for transaction in event.transactions:
            if not transaction.closed:
                positions = [
                    {
                        'price': item.price,
                        'assigned_to_ids': [
                            user.id for user in item.assigned_to
                        ],
                    }
                    for item in transaction.items
                ]
                transactions.append(
                    {'owner_id': transaction.payer_id, 'positions': positions}
                )

                transaction.closed = True

        if not transactions:
            return []

        participants = [
            {'id': user.id} for user in event.users
        ]
        input_data = {
            'participants': participants,
            'transactions': transactions,
        }

        response = requests.post(
            'http://optimizetka:3000/optimizetka/api/calculate-debts',
            json=input_data,
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f'Failed to calculate debts: {response.text}',
            )

        debts = response.json()

        session.commit()

        messages = {user.id: [] for user in event.users}

        for debt in debts:
            print(debts)
            from_user = next(
                u for u in event.users if u.id == debt['from_user_id']
            )
            to_user = next(
                u for u in event.users if u.id == debt['to_user_id']
            )
            print(from_user, to_user)
            amount = debt['amount']
            messages[from_user].append(
                f'You owe {amount} to {to_user}.'
            )
            messages[to_user.id].append(f'{from_user.name} owes you {amount}.')

        for user in event.users:
            message_text = '\n'.join(messages[user.id])
            if message_text:
                send_telegram_message(user.chat_id, message_text)

        return debts
