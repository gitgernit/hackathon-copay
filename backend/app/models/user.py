from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, BigInteger


class User(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger(), primary_key=True))
    username: str = Field(nullable=False)

    groups: list['Group'] = Relationship(back_populates="users")
