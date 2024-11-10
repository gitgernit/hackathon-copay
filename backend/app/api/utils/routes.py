import fastapi
from fastapi import HTTPException
import sqlmodel

from app.api.auth.deps import BearerAuth
from app.api.auth.deps import get_current_user
from app.api.utils.routers import utils_router
import app.core.db
from app.models import BasicResponse
from app.models import User
from app.models.base import OfdRequest
from app.models.event import Event
from app.models.item import Item
from app.models.transactions import Transaction
from app.utils.nalog import get_nalog_data


@utils_router.get('/health-check')
def health_check() -> dict[str, str]:
    return {'msg': 'healthy'}


@utils_router.post(
    '/ofd',
    description='Get items info from OFD bare string',
    dependencies=[fastapi.Depends(BearerAuth())],
    responses={
        400: {'model': BasicResponse, 'description': 'Bad OFD data'},
        403: {'model': BasicResponse, 'description': 'Unauthorized'},
        404: {'model': BasicResponse, 'description': 'Event not found'},
        500: {
            'model': BasicResponse,
            'description': 'Error while processing OFD data',
        },
    },
)
async def ofd(
    ofd: OfdRequest, user: User = fastapi.Depends(get_current_user)
) -> Transaction:
    with sqlmodel.Session(bind=app.core.db.engine) as session:
        event = session.get(Event, ofd.event_id)
        if not event:
            raise HTTPException(status_code=404, detail='Event not found')

        data = await get_nalog_data(ofd.ofd_string)
        data = data['data']['json']
        if not data:
            raise HTTPException(status_code=400, detail='Bad OFD data')

        transaction = Transaction(
            payer_id=user.id, event_id=event.id, title=data['retailPlace']
        )
        session.add(transaction)
        session.commit()
        items = data['items']

        for item in items:
            new_item = Item(
                title=item['name'],
                price=item['sum'] / 100,
                transaction_id=transaction.id,
            )
            session.add(new_item)
            session.commit()

            transaction.items.append(new_item)
            session.add(transaction)
            session.refresh(transaction)
            session.commit()

        try:
            return transaction

        except Exception:
            raise HTTPException(
                detail='Error while getting information about check',
                status_code=500,
            )
