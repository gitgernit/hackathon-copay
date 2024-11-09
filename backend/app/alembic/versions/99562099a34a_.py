"""empty message

Revision ID: 99562099a34a
Revises: cc4769ae182e
Create Date: 2024-11-09 15:52:29.236920

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '99562099a34a'
down_revision: Union[str, None] = 'cc4769ae182e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('event', sa.Column('owner_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'event', 'user', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'event', type_='foreignkey')
    op.drop_column('event', 'owner_id')
    # ### end Alembic commands ###
