import sqlmodel

from app.core.config import config

engine = sqlmodel.create_engine(config.DATABASE_URL)
