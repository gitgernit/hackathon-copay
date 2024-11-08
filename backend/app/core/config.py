import secrets

import pydantic
import pydantic_settings


class Config(pydantic_settings.BaseSettings):
    model_config = pydantic_settings.SettingsConfigDict(
        env_file='../.env',
        env_ignore_empty=True,
        extra='ignore',
    )

    DATABASE_URL: str = pydantic.fields.Field(default=None)

    JWT_SECRET_KEY: str = secrets.token_urlsafe(32)
    JWT_ALGORITHM: str = 'HS256'
    SAMPLE_PAYLOAD: dict[str, str] = pydantic.fields.Field(
        default={}, exclude=True
    )


config = Config()
