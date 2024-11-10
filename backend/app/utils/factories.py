import uuid

import sqlmodel

from app.core.config import config
from app.models.user import User

engine = sqlmodel.create_engine(config.DATABASE_URL)


class UserFactory:
    @staticmethod
    def new_user(
        id: int,
        username: str,
        events: list['Event'] = None,
        items: list['Item'] = None,
        transactions: list['Transaction'] = None,
    ):
        with sqlmodel.Session(engine) as session:
            user = User(
                id=id,
                username=username,
                events=events if events else [],
                items=items if items else [],
                transactions=transactions if transactions else [],
            )
            session.add(user)
            session.commit()

    @staticmethod
    def bulk_new_users(users: list[dict]):
        with sqlmodel.Session(engine) as session:
            print(session.exec(sqlmodel.select(User)).all())

        for user in users:
            UserFactory.new_user(**user)


class EventFactory:
    @staticmethod
    def new_event(
        id: int,
        owner_id: int,
        invite: uuid.UUID = None,
        users: list['User'] = None,
        transactions: list['Transaction'] = None,
    ):
        with sqlmodel.Session(engine) as session:
            user = User(
                id=id,
                username=username,
                events=events,
                items=items,
                transactions=transactions,
            )
            session.add(user)
            session.commit()

    @staticmethod
    def bulk_new_users(users: list[dict]):
        with sqlmodel.Session(engine) as session:
            print(session.exec(sqlmodel.select(User)).all())

        for user in users:
            UserFactory.new_user(**user)
