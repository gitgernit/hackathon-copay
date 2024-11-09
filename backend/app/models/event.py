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
    owner: User = Relationship(back_populates='events')
    users: list['User'] = Relationship(back_populates='events')
    invites: 'Invite' = Relationship(
        back_populates='event', cascade_delete=True
    )

    async def add_user(self, user: User):
        self.users.append(user)


class OutputEvent(BaseEvent):
    id: UUID
    owner: UUID
    users: list[UUID]
