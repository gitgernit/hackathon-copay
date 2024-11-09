import uuid

import sqlmodel


class EventUserLink(sqlmodel.SQLModel, table=True):
    event_id: uuid.UUID | None = sqlmodel.Field(
        default=None, foreign_key='event.id', primary_key=True
    )
    user_id: int | None = sqlmodel.Field(
        default=None, foreign_key='user.id', primary_key=True
    )
