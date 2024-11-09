import typing
import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.events.routers import events_router
import app.core.db
import app.models.event
import app.models.invite
from app.models.user import User


@events_router.get(
    '/',
    response_model=list[app.models.event.Event],
    description='Return events containing given user (by token)',
)
def list_events(
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
):
    return user.events


@events_router.post(
    '/',
    description='Create event',
)
def create_event(
    event: app.models.event.BaseEvent,
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
) -> app.models.event.Event:
    with sqlmodel.Session(app.core.db.engine) as session:
        new_event = app.models.event.Event(
            name=event.name, owner=user, users=[user]
        )
        session.add(new_event)
        session.commit()

    return new_event


@events_router.delete(
    '/{event_id}',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Delete an event',
)
def delete_event(
    event_id: uuid.UUID,
):
    with sqlmodel.Session(app.core.db.engine) as session:
        session.delete(session.get(app.models.event.Event, event_id))
        session.commit()


@events_router.get('/{event_id}')
def event_by_id(event_id: uuid.UUID) -> app.models.event.OutputEvent:
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        return event


@events_router.post("/{event_id}/transactions", response_model=app.models.transactions.Transaction, 
                    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)])
async def create_transaction(
    event_id: uuid.UUID,
    title: str = fastapi.Query(description="Title of transaction"),
    user: app.models.user.User = fastapi.Depends(app.api.auth.deps.BearerAuth)
):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        if not event:
            raise fastapi.HTTPException(status_code=404, detail="Event not found")
        transaction = app.models.transactions.Transaction(
            event=event,
            owner=user,
            title=title
        )
        session.add(transaction)
        session.commit()
    return transaction


@events_router.post("/{event_id}/transactions/{transaction_id}/items", response_model=app.models.item.Item, 
                    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)])
async def add_item_to_transaction(
    event_id: uuid.UUID,
    transaction_id: uuid.UUID,
    title: str = fastapi.Query(description="Title of item"),
    price: float = fastapi.Query(description="Price of item"),
    add_all_users: bool = fastapi.Query(description="Assign all users to this item", default=False)
):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        if not event:
            raise fastapi.HTTPException(status_code=404, detail="Event not found")
        transaction = session.get(app.models.transactions.Transaction, transaction_id)
        if not transaction:
            raise fastapi.HTTPException(status_code=404, detail="Transaction not found")
        
        if transaction.event != event:
            raise fastapi.HTTPException(status_code=400, detail="This transaction is not child of this event")
        
        item = app.models.item.Item(
            title=title,
            price=price,
            assigned_to=[] if not add_all_users else event.users
        )
        session.add(item)
        session.commit()
        await transaction.add_item(item)
        session.commit()

    return item