from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.user import User

from .links import ItemUserLink


class Item(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    title: str = Field(nullable=False)
    price: float = Field(nullable=False)

    assigned_to: list['User'] = Relationship(
        back_populates='items', link_model=ItemUserLink
    )
    transaction_id: UUID = Field(foreign_key='transaction.id')
    transaction: 'Transaction' = Relationship(back_populates='items')

    def assign_user(self, user: User):
        self.assigned_to.append(user)


class OutputItem(SQLModel):
    id: UUID
    title: str
    price: float
    assigned_to: list['User']
    transaction_id: UUID


class ItemRequest(SQLModel):
    title: str
    price: float

    all_users_selected: bool = False
