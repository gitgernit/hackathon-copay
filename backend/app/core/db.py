import sqlmodel

from app.core.config import config

engine = sqlmodel.create_engine(config.DATABASE_URL)


def test_conn():
    with sqlmodel.Session(engine) as session:
        session.execute(sqlmodel.text('SELECT 1'))
