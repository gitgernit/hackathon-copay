import typing
import app.api.auth.deps
from app.api.groups.routers import groups_router
from app.models.user import User
import fastapi
import sqlmodel


@groups_router.get('/')
def root(user: typing.Annotated[User, fastapi.Depends(app.api.auth.deps.get_user)]):
    return user.groups
