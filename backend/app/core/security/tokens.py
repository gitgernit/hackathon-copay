import datetime
import typing

import jwt

import sqlmodel
from app.core.config import config
import app.models
from app.models.user import User
import app.core.db.db


def generate_token(
    payload: dict[typing.Any, typing.Any],
    expires_delta: datetime.timedelta | None = None,
) -> str:
    to_encode = payload.copy()

    if expires_delta:
        expire = datetime.datetime.now(datetime.UTC) + expires_delta

    else:
        expire = datetime.datetime.now(datetime.UTC) + datetime.timedelta(
            minutes=15
        )

    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(
        to_encode, config.JWT_SECRET_KEY, algorithm=config.JWT_ALGORITHM
    )

    return encoded_jwt


def user_by_token(token: str) -> User | None:
    """Expects user_id to be in token payload"""

    try:
        payload: dict = jwt.decode(token, config.JWT_SECRET_KEY, [config.JWT_ALGORITHM])

    except (jwt.InvalidTokenError, jwt.InvalidSignatureError):
        return None

    user_id: str = payload.get('user_id')

    if not user_id.isdigit():
        return None

    session: sqlmodel.Session = app.core.db.db.get_db()

    user = session.get(User, user_id)

    return user

