from typing import Annotated

from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer
import jwt

from app.core.config import config
from app.models.user import User

from .utils import decode_jwt


class BearerAuth(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super().__call__(
            request
        )

        if credentials:
            if not credentials.scheme == 'Bearer':
                raise HTTPException(
                    status_code=403, detail='Invalid authentication scheme.'
                )
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail='Invalid token or expired token.'
                )
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=403, detail='Invalid authorization code.'
            )

    def verify_jwt(self, token: str) -> bool:
        payload = decode_jwt(token)
        is_valid = bool(payload)

        return is_valid


oauth2_scheme = BearerAuth()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(
            token, config.JWT_SECRET_KEY, algorithms=['HS256']
        )
        user = await User.get_or_create_user(
            User(
                id=payload['user_id'],
                username=payload['username'],
                events=[],
                items=[],
                transactions=[],
            )
        )
        return user
    except jwt.ExpiredSignatureError:
        return {'error': 'Token is expired'}
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token'}
