from uuid import UUID

import sqlmodel
import fastapi

import app.core.db
from app.models.item import Item, ItemRequest
from app.models.transactions import Transaction
from app.models.event import Event

from .routers import items_router


@items_router.post('/{transaction_id}',
                   description="Create item in transaction")
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
