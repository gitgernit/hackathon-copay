from uuid import UUID

from pydantic import BaseModel


class BasicResponse(BaseModel):
    detail: str


class OfdRequest(BaseModel):
    ofd_string: str
    event_id: UUID
