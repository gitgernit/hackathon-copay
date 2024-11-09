"""empty message

Revision ID: 8db1d895dfd4
Revises: fc46c48ccfd6
Create Date: 2024-11-09 14:02:43.696710

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8db1d895dfd4'
down_revision: Union[str, None] = 'fc46c48ccfd6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
