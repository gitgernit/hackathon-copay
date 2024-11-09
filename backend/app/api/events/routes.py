import typing
import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.events.routers import events_router
import app.core.db
import app.models.event
from app.models.user import User


@events_router.get(
    '/',
    response_model=list[app.models.event.Event],
    description='Return events containing given user (by token)',
)
def list_groups(
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
):
    return user.groups


@events_router.post(
    '/',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Create event',
)
def create_group(
    group: app.models.event.BaseEvent,
) -> app.models.event.Event:
    with sqlmodel.Session(app.core.db.engine) as session:
        new_group = app.models.event.Event(name=group.name)
        session.add(new_group)
        session.commit()

    return new_group


@events_router.delete(
    '/{event_id}',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Delete event',
)
def delete_event(
    event_id: uuid.UUID,
):
    with sqlmodel.Session(app.core.db.engine) as session:
        session.delete(session.get(app.models.event.Event, event_id))
        session.commit()


@events_router.get('/{event_id}', response_model=app.models.event.Event)
def group_by_id(event_id: uuid.UUID):
    with sqlmodel.Session(app.core.db.engine) as session:
        group = session.get(app.models.event.Event, event_id)
        return group
