from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.item import Item
from app.models.user import User


class Transaction(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    event_id: UUID = Field(foreign_key='event.id')
    owner_id: int = Field(foreign_key='user.id')
    title: str = Field(nullable=False)
    closed: bool = Field(nullable=False, default=False)

    participants: list['User'] = Relationship(back_populates='transactions')
    items: list['Item'] = Relationship()

    async def add_participant(self, participant: User):
        self.participants.append(participant)

    async def add_item(self, item: Item):
        self.items.append(item)
