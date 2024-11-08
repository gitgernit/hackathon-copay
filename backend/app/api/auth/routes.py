from typing import Annotated

from fastapi import Depends
import jwt

from app.api.auth.deps import oauth2_scheme
from app.api.auth.exceptions import credentials_exception
from app.api.auth.routers import auth_router
from app.core.config import config
import app.core.security.tokens
from app.models.tokens import Token


@auth_router.post('/token')
def authenticate() -> Token:
    return Token(
        access_token=app.core.security.tokens.generate_token(
            config.SAMPLE_PAYLOAD
        ),
        token_type='bearer',
    )


@auth_router.get('/ping')
def ping() -> str:
    return 'pong'
