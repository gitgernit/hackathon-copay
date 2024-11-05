import fastapi.security

oauth2_scheme = fastapi.security.OAuth2PasswordBearer(tokenUrl='token')
