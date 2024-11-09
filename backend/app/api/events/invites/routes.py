import datetime
import typing
import uuid

import fastapi
from fastapi import HTTPException
import sqlmodel

import app.api.auth.deps
from app.api.events.invites.routers import events_router
import app.core.db
import app.models.base
import app.models.invite
from app.models.user import User


@events_router.post(
    '/create',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Create invite',
)
def create_invite(
    data: app.models.invite.InputInvite,
) -> app.models.invite.Invite:
    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(app.models.event.Event, data.event_id)

        if not event:
            raise HTTPException(fastapi.status.HTTP_400_BAD_REQUEST)

        invite = app.models.invite.Invite(
            event=event,
            usages=data.usages,
            expiration_date=data.expiration_time,
        )

    return invite


@events_router.get(
    '/{invite_id}',
    responses={
        fastapi.status.HTTP_400_BAD_REQUEST: {
            'model': app.models.base.BasicResponse,
            'detail': 'Invalid invite',
        }
    },
)
def join_by_invite(
    invite_id: uuid.UUID,
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
) -> app.models.event.Event:
    with sqlmodel.Session(app.core.db.engine) as session:
        invite = session.get(app.models.invite.Invite, invite_id)

        if not invite:
            raise HTTPException(fastapi.status.HTTP_400_BAD_REQUEST)

        if invite.usages <= 0 or datetime.datetime.now(
            datetime.UTC
        ) > invite.expiration_date.astimezone(datetime.UTC):
            session.delete(invite)
            raise HTTPException(fastapi.status.HTTP_400_BAD_REQUEST)

        invite.event.add_user(user)
        invite.usages -= 1

        session.commit()

        return invite.event
