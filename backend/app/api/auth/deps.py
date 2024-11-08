from fastapi import HTTPException, Request
from typing_extensions import Annotated, Doc
import fastapi.security

from .utils import decode_jwt

oauth2_scheme = fastapi.security.OAuth2PasswordBearer(tokenUrl='token')


class BearerAuth(fastapi.security.HTTPBearer):
    def __init__(self, *, bearerFormat: str | None = None, scheme_name: str | None = None, description: str | None = None, auto_error: bool = True):
        super().__init__(bearerFormat=bearerFormat, scheme_name=scheme_name, description=description, auto_error=auto_error)

    async def __call__(self, request: Request) -> fastapi.security.HTTPAuthorizationCredentials | None:
        credentials: fastapi.security.HTTPAuthorizationCredentials = await super(BearerAuth, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        is_valid: bool = False

        try:
            payload = decode_jwt(jwtoken)
        except Exception as e:
            print(e)
            payload = {}
        if payload:
            is_valid = True

        return is_valid
