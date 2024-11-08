from sqlalchemy import BigInteger
from sqlalchemy import Column
from sqlmodel import create_engine
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import Session
from sqlmodel import SQLModel

from app.core.config import config


class User(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger(), primary_key=True))
    username: str = Field(nullable=False)

    groups: list['Group'] = Relationship(back_populates='users')

    async def get_or_create_user(self):
        engine = create_engine(url=config.DATABASE_URL)
        with Session(engine) as session:
            user = session.get(User, self.id)
            if not user:
                user = User(
                    id=self.id,
                    username=self.username,
                )
                session.add(user)
                session.commit()
        return user
