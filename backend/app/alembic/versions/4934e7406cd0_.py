"""empty message

Revision ID: 4934e7406cd0
Revises: 3f6feff5972e
Create Date: 2024-11-10 11:50:17.038836

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4934e7406cd0'
down_revision: Union[str, None] = '3f6feff5972e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
