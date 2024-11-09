from http.client import HTTPException
import typing
import uuid

import fastapi
import sqlmodel

import app.api.auth.deps
from app.api.groups.routers import groups_router
import app.core.db
import app.models.group
import app.models.invite
from app.models.user import User


@groups_router.get(
    '/',
    response_model=list[app.models.group.Group],
    description='Return groups containing given user (by token)',
)
def list_groups(
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
):
    return user.groups


@groups_router.post(
    '/',
    description='Create group',
)
def create_group(
    group: app.models.group.BaseGroup,
    user: typing.Annotated[
        User, fastapi.Depends(app.api.auth.deps.get_current_user)
    ],
) -> app.models.group.Group:
    with sqlmodel.Session(app.core.db.engine) as session:
        new_group = app.models.group.Group(
            name=group.name, owner=user, users=[user]
        )
        session.add(new_group)
        session.commit()

    return new_group


@groups_router.post(
    '/invite',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Create invite',
)
def create_invite(
    data: app.models.invite.InputInvite,
) -> app.models.invite.Invite:
    with sqlmodel.Session(app.core.db.engine) as session:
        group = session.get(app.models.group.Group, data.group_id)

        if not group:
            raise HTTPException(fastapi.status.HTTP_400_BAD_REQUEST)

        invite = app.models.invite.Invite(
            group=group,
            usages=data.usages,
            expiration_date=data.expiration_time,
        )

    return invite


@groups_router.delete(
    '/{group_id}',
    dependencies=[fastapi.Depends(app.api.auth.deps.get_current_user)],
    description='Delete group',
)
def delete_group(
    group_id: uuid.UUID,
):
    with sqlmodel.Session(app.core.db.engine) as session:
        session.delete(session.get(app.models.group.Group, group_id))
        session.commit()


@groups_router.get('/{group_id}', response_model=app.models.group.Group)
def group_by_id(group_id: uuid.UUID):
    with sqlmodel.Session(app.core.db.engine) as session:
        group = session.get(app.models.group.Group, group_id)
        return group
