import datetime
import jwt

import app.core.config

config = app.core.config.config

SECRET_KEY = config.SECRET_KEY
ALGORITHM = 'HS256'


def generate_token(
    payload: dict, expires_delta: datetime.timedelta | None = None
):
    to_encode = payload.copy()

    if expires_delta:
        expire = datetime.datetime.now(datetime.UTC) + expires_delta

    else:
        expire = datetime.datetime.now(datetime.UTC) + datetime.timedelta(
            minutes=15
        )

    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt
