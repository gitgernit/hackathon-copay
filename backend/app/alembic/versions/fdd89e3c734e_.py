"""empty message

Revision ID: fdd89e3c734e
Revises: 45b340919b0c, ddf530c30176
Create Date: 2024-11-09 17:21:06.620200

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fdd89e3c734e'
down_revision: Union[str, None] = ('45b340919b0c', 'ddf530c30176')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
