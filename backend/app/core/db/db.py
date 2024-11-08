import sqlmodel
from app.core.config import config

engine = sqlmodel.create_engine(config.DATABASE_URL)


def get_db() -> sqlmodel.Session:
    try:
        with sqlmodel.Session(engine) as session:
            return session

    finally:
        session.commit()
