import datetime
from uuid import UUID
from uuid import uuid4

from sqlmodel import Field
from sqlmodel import Relationship
from sqlmodel import SQLModel

from app.models.event import Event


class BaseInvite(SQLModel):
    usages: int = Field(nullable=False)
    expiration_date: datetime.datetime = Field(nullable=False)


class InputInvite(BaseInvite):
    event_id: int = Field(nullable=False)


class Invite(BaseInvite, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    event: 'Event' = Relationship(back_populates='invites')
