import uuid

from sqlalchemy import BigInteger
from sqlalchemy import Column
from sqlalchemy import ForeignKey
import sqlmodel


class EventUserLink(sqlmodel.SQLModel, table=True):
    event_id: uuid.UUID | None = sqlmodel.Field(
        default=None, foreign_key='event.id', primary_key=True
    )
    user_id: int | None = sqlmodel.Field(
        sa_column=Column(BigInteger(), ForeignKey('user.id'), primary_key=True)
    )


class ItemUserLink(sqlmodel.SQLModel, table=True):
    item_id: uuid.UUID | None = sqlmodel.Field(
        default=None, foreign_key='item.id', primary_key=True
    )
    user_id: int | None = sqlmodel.Field(
        sa_column=Column(BigInteger(), ForeignKey('user.id'), primary_key=True)
    )
