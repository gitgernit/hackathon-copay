from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.transactions import Transaction

from .links import EventUserLink
from .user import User


class BaseEvent(SQLModel):
    name: str = Field(nullable=False, default='Change name pls')


class Event(BaseEvent, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    owner_id: int = Field(foreign_key='user.id')
    invite: str | None = Field(default_factory=uuid4)
    users: list['User'] = Relationship(
        back_populates='events', link_model=EventUserLink
    )
    transactions: list['Transaction'] = Relationship(
        back_populates='event', cascade_delete=True
    )

    async def add_user(self, user: User):
        self.users.append(user)

    async def add_transaction(self, transaction: Transaction):
        self.transactions.append(transaction)


class OutputEvent(BaseEvent):
    id: UUID
    owner: int
    users: list[User]
    invite: str | None
    name: str


class AddUserRequest(SQLModel):
    user_id: int
