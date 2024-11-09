from uuid import UUID

import fastapi
import sqlmodel

import app.core.db
from app.models.event import Event
from app.models.item import Item
from app.models.item import ItemRequest
from app.models.item import OutputItem
from app.models.transactions import Transaction

from ...models import BasicResponse
from ..auth.deps import BearerAuth
from .routers import items_router


@items_router.get(
    '/{transaction_id}',
    description='Get items from transaction',
    responses={
        404: {
            'model': BasicResponse,
            'description': 'Transaction by this ID is not found',
        },
        403: {'model': BasicResponse, 'description': 'Unauthorized'},
    },
)
async def get_items(transaction_id: UUID) -> list[Item]:
    with sqlmodel.Session(bind=app.core.db.engine) as session:
        transaction = session.get(Transaction, transaction_id)
        if not transaction:
            raise fastapi.HTTPException(
                detail='Transaction not found', status_code=404
            )

        return transaction.items


@items_router.post(
    '/{transaction_id}',
    description='Create item in transaction',
    responses={
        400: {
            'model': BasicResponse,
            'description': 'Invalid data format (ex. negative price)',
        },
        404: {
            'model': BasicResponse,
            'description': 'Transaction with this ID is not found',
        },
        403: {'model': BasicResponse, 'description': 'Unauthorized'},
    },
)
async def create_item(item: ItemRequest, transaction_id: UUID) -> Item:
    if item.price <= 0:
        raise fastapi.HTTPException(
            detail='Price cannot be null or negative', status_code=400
        )

    with sqlmodel.Session(bind=app.core.db.engine) as session:
        transaction = session.get(Transaction, transaction_id)
        if not transaction:
            raise fastapi.HTTPException(
                detail='Transaction not found', status_code=404
            )
        event = session.get(Event, transaction.event_id)

        new_item = Item(
            title=item.title,
            price=item.price,
            assigned_to=[] if not item.all_users_selected else event.users,
            transaction_id=transaction.id,
        )
        session.add(new_item)
        session.commit()

        return new_item


@items_router.get(
    path='/{transaction_id}/{item_id}',
    description='Get item by itself ID',
    dependencies=[fastapi.Depends(BearerAuth())],
    responses={
        404: {
            'model': BasicResponse,
            'description': 'Item with this ID is not found',
        },
        403: {'model': BasicResponse, 'description': 'Unauthorized'},
    },
)
async def get_item(transaction_id: UUID, item_id: UUID) -> OutputItem:
    with sqlmodel.Session(bind=app.core.db.engine) as session:
        item = session.get(Item, item_id)
        if not item:
            raise fastapi.HTTPException(
                detail='Item not found', status_code=404
            )

        return OutputItem(
            id=item.id,
            title=item.title,
            price=item.price,
            assigned_to=item.assigned_to,
            transaction_id=transaction_id,
        )
