import datetime
import typing

import jwt

from app.core.config import config


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
