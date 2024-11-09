from datetime import timedelta
from hashlib import sha256
import hmac

import fastapi
from fastapi import HTTPException

from app.api.auth.routers import auth_router
from app.core.config import config
import app.core.security.tokens
from app.models.base import BasicResponse
from app.models.telegram import TelegramInputData
from app.models.tokens import Token
from app.models.user import User


@auth_router.post(
    '/token',
    responses={
        fastapi.status.HTTP_401_UNAUTHORIZED: {
            'description': 'Unauthorized',
            'model': BasicResponse,
        },
    },
)
async def authenticate(init_data: TelegramInputData) -> Token:
    if not config.DEBUG:
        fields = init_data.model_dump()
        sorted_fields = sorted(fields.items())
        formatted = [f'{key}={value}' for key, value in sorted_fields]
        data_check_string = '\n'.join(formatted)
        secret_key = hmac.new(
            b'WebAppData', config.TOKEN_TELEGRAM_API.encode(), sha256
        ).hexdigest()
        if (
            hmac.new(
                secret_key.encode(), data_check_string.encode(), sha256
            ).hexdigest()
            != init_data.hash
        ):
            raise HTTPException(status_code=403, detail='Unauthorized')

    user = await User.get_or_create_user(
        User(id=init_data.user.id, username=init_data.user.username)
    )

    return Token(
        access_token=app.core.security.tokens.generate_token(
            {'user_id': user.id, 'username': user.username},
            expires_delta=timedelta(days=7),
        ),
        token_type='bearer',
    )


@auth_router.get('/ping')
def ping() -> str:
    return 'pong'
