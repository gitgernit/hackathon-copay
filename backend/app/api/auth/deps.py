import fastapi.security
import app.models.user
import app.core.security.tokens
import typing

oauth2_scheme = fastapi.security.OAuth2PasswordBearer(tokenUrl='token')


async def get_user(token: typing.Annotated[str, fastapi.Depends(oauth2_scheme)]) -> app.models.user.User:
    user = app.core.security.tokens.user_by_token(token)
    return user

