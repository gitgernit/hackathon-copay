from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.item import Item
from app.models.user import User


class Transaction(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    event: 'Event' = Relationship(back_populates='transactions')
    owner: 'User' = Relationship(back_populates='transactions')
    title: str = Field(nullable=False)
    closed: bool = Field(nullable=False, default=False)

    partipicants: list['User'] = Relationship(back_populates='transactions')
    items: list['Item'] = Relationship(back_populates='transactions')

    async def add_partipicant(self, partipicant: User):
        self.partipicants.append(partipicant)

    async def add_item(self, item: Item):
        self.items.append(item)
