from sqlalchemy import BigInteger
from sqlalchemy import Column
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel


class User(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger(), primary_key=True))
    username: str = Field(nullable=False)

    groups: list['Group'] = Relationship(back_populates='users')
