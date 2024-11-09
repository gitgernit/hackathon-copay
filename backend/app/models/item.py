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
    transaction: 'Transaction' = Relationship(back_populates='items')

    def assign_user(self, user: User):
        self.assigned_to.append(user)
