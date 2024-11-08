from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from .user import User


class Group(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    name: str = Field(nullable=False, default='Change name pls')
    owner: User = Relationship(back_populates='groups')

    member: list['User'] = Relationship(back_populates='groups')

    async def add_member(self, member: User):
        self.member.append(member)
