import jwt

from app.core.config import config


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(
            token, config.JWT_SECRET_KEY, algorithms=['HS256']
        )
        return decoded_token

    except (jwt.InvalidTokenError, jwt.ExpiredSignatureError):
        return {}
