from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID
from typing import List
import httpx

from models.event import Event
from .routers import calculate_debits_router


@calculate_debits_router.post("/events/{event_id}/calculate-debts")
async def calculate_event_debts(
    event_id: UUID,
    user: typing.Annotated[User, fastapi.Depends(app.api.auth.deps.get_current_user)],
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(select(Event).where(Event.id == event_id))
    event = result.scalars().first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    participants = [{"id": user.id, "name": user.name} for user in event.users]

    transactions = []
    for transaction in event.transactions:
        positions = [
            {
                "price": item.price,
                "assigned_to_ids": [user.id for user in item.assigned_to],
            }
            for item in transaction.items
        ]
        transactions.append({"owner_id": transaction.payer_id, "positions": positions})

    input_data = {"participants": participants, "transactions": transactions}
    print(input_data)
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:3000/optimizetka/api/calculate-debts", json=input_data
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code, detail="Failed to calculate debts"
            )

    return response.json()
