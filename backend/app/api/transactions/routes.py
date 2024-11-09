import typing
import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.transactions.routers import transactions_router
import app.core.db
import app.models.item


@transactions_router.get(
    '/{event_id}/{transaction_id}',
    response_model=app.models.transactions.OutputTransaction,
    description='Get a transaction by its event and transaction id',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    responses={
        fastapi.status.HTTP_404_NOT_FOUND: {
            'model': app.models.base.BasicResponse,
            'detail': r'Event \ transaction not found',
        },
    },
)
async def get_transaction(
    event_id: uuid.UUID,
    transaction_id: uuid.UUID,
    user: typing.Annotated[
        app.models.user.User,
        fastapi.Depends(app.api.auth.deps.get_current_user),
    ],
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
        output_transaction = app.models.transactions.OutputTransaction(
            title=transaction.title,
            payer=transaction.payer,
            event_id=transaction.event_id,
            closed=transaction.closed,
            items=transaction.items,
        )

    return output_transaction


@transactions_router.post(
    '/{event_id}',
    response_model=app.models.transactions.Transaction,
    description='Create a transaction by a event id',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    responses={
        fastapi.status.HTTP_404_NOT_FOUND: {
            'model': app.models.base.BasicResponse,
            'detail': 'Event not found',
        },
    },
)
async def create_transaction(
    title: typing.Annotated[
        str, fastapi.Body(description='Title of transaction')
    ],
    event_id: uuid.UUID,
    user: typing.Annotated[
        app.models.user.User,
        fastapi.Depends(app.api.auth.deps.get_current_user),
    ],
):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)

        if not event:
            raise fastapi.HTTPException(
                status_code=404, detail='Event not found'
            )

        transaction = app.models.transactions.Transaction(
            event_id=event.id, owner_id=user.id, title=title
        )
        session.add(transaction)
        session.commit()
        session.refresh(transaction)

    return transaction


@transactions_router.post(
    '/{event_id}/{transaction_id}/items',
    response_model=app.models.item.Item,
    description='Create a transaction by a event id',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    responses={
        fastapi.status.HTTP_404_NOT_FOUND: {
            'model': app.models.base.BasicResponse,
            'detail': r'Event \ transaction not found',
        },
        fastapi.status.HTTP_400_BAD_REQUEST: {
            'model': app.models.base.BasicResponse,
            'detail': r'Transaction is not a child of the given event',
        },
    },
)
async def add_item_to_transaction(
    event_id: uuid.UUID,
    transaction_id: uuid.UUID,
    title: str = fastapi.Body(description='Title of item'),
    price: float = fastapi.Body(description='Price of item'),
    add_all_users: bool = fastapi.Body(
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

        if transaction.event_id != event.id:
            raise fastapi.HTTPException(
                status_code=400,
                detail='This transaction is not a child of this event',
            )

        item = app.models.item.Item(
            title=title,
            price=price,
            assigned_to=[] if not add_all_users else event.users,
            transaction_id=transaction_id,
        )

        session.add(item)
        session.commit()
        session.refresh(item)

    return item
