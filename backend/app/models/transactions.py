from sqlmodel import SQLModel


class Transaction(SQLModel, table=True): ...
