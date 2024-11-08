"""add name field to group

Revision ID: a70f17d2f4ad
Revises: c3b97781c816
Create Date: 2024-11-08 20:26:45.722438

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = 'a70f17d2f4ad'
down_revision: Union[str, None] = 'c3b97781c816'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('group', sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('group', 'name')
    # ### end Alembic commands ###