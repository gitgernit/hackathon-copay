import secrets
import pydantic_settings


class Config(pydantic_settings.BaseSettings):
    model_config = pydantic_settings.SettingsConfigDict(
        env_file='../.env',
        env_ignore_empty=True,
        extra='ignore',
    )

    SECRET_KEY: str = secrets.token_urlsafe(32)


config = Config()
