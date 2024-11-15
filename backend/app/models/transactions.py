from uuid import UUID
from uuid import uuid4

from sqlalchemy import BigInteger
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.item import Item
from app.models.user import User


class BaseTransaction(SQLModel):
    title: str = Field(nullable=False)


class Transaction(BaseTransaction, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    payer_id: int = Field(
        sa_column=Column(BigInteger(), ForeignKey('user.id'))
    )
    payer: User = Relationship(back_populates='transactions')
    event_id: UUID = Field(foreign_key='event.id')
    event: 'Event' = Relationship(back_populates='transactions')
    closed: bool = Field(nullable=False, default=False)
    items: list['Item'] = Relationship(back_populates='transaction')

    async def add_participant(self, participant: User):
        self.participants.append(participant)

    async def add_item(self, item: Item):
        self.items.append(item)


class OutputTransaction(BaseTransaction):
    id: UUID
    payer: User
    event_id: UUID
    closed: bool
    items: list['Item']
