"""empty message

Revision ID: 03f5d4114e03
Revises: 93528624f0e3, bc878a4cbbf1
Create Date: 2024-11-09 12:05:32.097442

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '03f5d4114e03'
down_revision: Union[str, None] = ('93528624f0e3', 'bc878a4cbbf1')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
