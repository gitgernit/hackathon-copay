from logging import config
from typing import Annotated

from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer
from fastapi.security import OAuth2PasswordBearer
import jwt

from app.models.user import User

from .utils import decode_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


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


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])
        user = await User.get_or_create_user(
            payload['user_id'], payload['username']
        )
        return user
    except jwt.ExpiredSignatureError:
        return {'error': 'Token is expired'}
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token'}
