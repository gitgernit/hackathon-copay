import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.transactions.routers import transactions_router
import app.core.db
import app.models.item


@transactions_router.post(
    '/{event_id}/transactions',
    response_model=app.models.transactions.Transaction,
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
)
async def create_transaction(
    event_id: uuid.UUID,
    title: str = fastapi.Query(description='Title of transaction'),
    user: app.models.user.User = fastapi.Depends(
        app.api.auth.deps.get_current_user
    ),
):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        if not event:
            raise fastapi.HTTPException(
                status_code=404, detail='Event not found'
            )
        transaction = app.models.transactions.Transaction(
            event=event, owner=user, title=title
        )
        session.add(transaction)
        session.commit()
    return transaction


@transactions_router.post(
    '/{event_id}/transactions/{transaction_id}/items',
    response_model=app.models.item.Item,
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
)
async def add_item_to_transaction(
    event_id: uuid.UUID,
    transaction_id: uuid.UUID,
    title: str = fastapi.Query(description='Title of item'),
    price: float = fastapi.Query(description='Price of item'),
    add_all_users: bool = fastapi.Query(
        description='Assign all users to this item', default=False
    ),
):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        if not event:
            raise fastapi.HTTPException(
                status_code=404, detail='Event not found'
            )
        transaction = session.get(
            app.models.transactions.Transaction, transaction_id
        )
        if not transaction:
            raise fastapi.HTTPException(
                status_code=404, detail='Transaction not found'
            )

        if transaction.event != event:
            raise fastapi.HTTPException(
                status_code=400,
                detail='This transaction is not child of this event',
            )

        item = app.models.item.Item(
            title=title,
            price=price,
            assigned_to=[] if not add_all_users else event.users,
        )
        session.add(item)
        session.commit()
        await transaction.add_item(item)
        session.commit()

    return item
