from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.item import Item
from app.models.user import User


class Transaction(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    payer_id: int = Field(foreign_key='user.id')
    payer: User = Relationship(back_populates='transactions')
    event_id: UUID = Field(foreign_key='event.id')
    event: 'Event' = Relationship(back_populates='transactions')
    title: str = Field(nullable=False)
    closed: bool = Field(nullable=False, default=False)
    items: list['Item'] = Relationship(back_populates='transaction')

    async def add_participant(self, participant: User):
        self.participants.append(participant)

    async def add_item(self, item: Item):
        self.items.append(item)
