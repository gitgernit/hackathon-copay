from uuid import UUID, uuid4
from app.models.user import User
from sqlmodel import SQLModel, Field, Relationship


class Item(SQLModel, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    title: str = Field(nullable=False)
    price: float = Field(nullable=False)

    assigned_to: list['User'] = Relationship(back_populates="items")

    def assign_user(self, user: User):
        self.assigned_to.append(user)
