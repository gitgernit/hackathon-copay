from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, Relationship

from .user import User


class Group(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    owner: User = Relationship(back_populates="groups")

    member: list['User'] = Relationship(back_populates="groups")

    async def add_member(self, member: User):
        self.member.append(member)