import typing
import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.auth.deps import BearerAuth
from app.api.events.routers import events_router
import app.core.db
import app.models.event
from app.models.user import User


@events_router.get(
    '/',
    response_model=list[app.models.event.OutputEvent],
    description='Return events containing given user (by token)',
    dependencies=[fastapi.Depends(BearerAuth())],
)
def list_events(
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
):
    output = []

    with sqlmodel.Session(app.core.db.engine) as session:
        user = session.get(User, user.id)

        for event in user.events:
            new_output = app.models.event.OutputEvent(
                id=event.id,
                owner=event.owner_id,
                users=event.users,
                invite=event.invite,
            )
            output.append(new_output)

    return output


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
            name=event.name, owner_id=user.id, users=[user]
        )
        session.add(new_event)
        session.commit()
        session.refresh(new_event)

    return new_event


# @events_router.delete(
#     '/{event_id}',
#     dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
#     description='Delete an event',
# )
# def delete_event(
#     event_id: uuid.UUID,
# ):
#     with sqlmodel.Session(app.core.db.engine) as session:
#         session.delete(session.get(app.models.event.Event, event_id))
#         session.commit()


@events_router.get(
    '/{event_id}',
    response_model=app.models.event.OutputEvent,
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Get info for an event by the id',
)
def event_by_id(event_id: uuid.UUID):
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, event_id)
        new_event = app.models.event.OutputEvent(
            id=event.id,
            owner=event.owner,
            users=[user.username for user in event.users],
            invite=event.invite,
        )
        return new_event
