from pydantic import BaseModel


class BasicResponse(BaseModel):
    detail: str


class OfdRequest(BaseModel):
    ofd_string: str
