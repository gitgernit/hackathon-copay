import datetime
import typing
import uuid

import fastapi
from fastapi import HTTPException
import sqlmodel

import app.api.auth.deps
from app.api.events.invites.routers import invites_router
import app.core.db
import app.models.base
from app.models import Event, BasicResponse
from app.models.user import User


@invites_router.get(
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
        user = session.get(User, user.id)
        event = session.query(Event).filter_by(invite=invite_id).first()
        if not event:
            raise HTTPException(fastapi.status.HTTP_404_NOT_FOUND, detail="Invite not found")

        event.users.append(user)
        session.commit()

        return event
