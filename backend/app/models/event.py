from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from .user import User


class BaseEvent(SQLModel):
    name: str = Field(nullable=False, default='Change name pls')


class Event(BaseEvent, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    owner: User = Relationship(back_populates='groups')
    users: list['User'] = Relationship(back_populates='groups')

    async def add_user(self, user: User):
        self.users.append(user)
