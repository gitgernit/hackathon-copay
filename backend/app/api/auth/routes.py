from typing import Annotated

from fastapi import Depends

import app.core.security.tokens
from app.api.auth.routers import auth_router
from app.api.auth.deps import oauth2_scheme


@auth_router.post('/token')
def authenticate():
    return {
        'access_token': app.core.security.tokens.generate_token({}),
        'token_type': 'bearer',
    }


@auth_router.get('/ping')
def ping(token: Annotated[str, Depends(oauth2_scheme)]):
    return {'token': token}
