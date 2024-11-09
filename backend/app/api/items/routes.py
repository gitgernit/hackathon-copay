from http.client import HTTPException
from uuid import UUID

import sqlmodel
import fastapi

import app.core.db
from app.models.item import Item, ItemRequest
from app.models.transactions import Transaction
from app.models.event import Event

from .routers import items_router
from ...models import BasicResponse


@items_router.get(
    '/{transaction_id}',
    description="Get items from transaction",
    responses={
        404: {"model": BasicResponse, "description": "Transaction by this ID is not found"},
        403: {"model": BasicResponse, "description": "Unauthorized"},
    }
)
async def get_items(
        transaction_id: UUID
) -> list[Item]:
    with sqlmodel.Session(bind=app.core.db.engine) as session:
        transaction = session.get(Transaction, transaction_id)
        if not transaction:
            raise fastapi.HTTPException(
                detail="Transaction not found",
                status_code=404
            )

        return transaction.items

@items_router.post('/{transaction_id}',
                   description="Create item in transaction",
                   responses={
                       400: {"model": BasicResponse, "description": "Invalid data format (ex. negative price or illegal id"},
                       403: {"model": BasicResponse, "description": "Unauthorized"},
                   })
async def create_item(
        item: ItemRequest,
        transaction_id: UUID
) -> Item:
    if item.price <= 0:
        raise fastapi.HTTPException(detail="Price cannot be null or negative", status_code=400)

    with sqlmodel.Session(bind=app.core.db.engine) as session:
        transaction = session.get(Transaction, transaction_id)
        event = session.get(Event, transaction.event_id)
        if not transaction or not event:
            raise fastapi.HTTPException(detail="Event or transaction is not found", status_code=400)

        new_item = Item(
            title=item.title,
            price=item.price,
            assigned_to=[] if not item.all_users_selected else event.users,
            transaction_id=transaction.id
        )
        session.add(new_item)
        session.commit()

        return new_item
