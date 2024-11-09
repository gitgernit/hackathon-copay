from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field


class Item(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    title: str = Field(nullable=False)
    split: bool = Field(nullable=False)
    price: float = Field(nullable=False)
