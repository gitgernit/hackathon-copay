"""empty message

Revision ID: 935fde7ef3b0
Revises: 45f2657586e7, 8db1d895dfd4
Create Date: 2024-11-09 14:03:24.964711

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '935fde7ef3b0'
down_revision: Union[str, None] = ('45f2657586e7', '8db1d895dfd4')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
