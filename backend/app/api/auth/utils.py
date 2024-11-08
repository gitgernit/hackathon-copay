from datetime import time
import jwt

from app.core.config import config

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except Exception as e:
        return {}
