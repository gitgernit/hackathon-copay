"""empty message

Revision ID: 444a44490f39
Revises: 49da0d86bd9f
Create Date: 2024-11-09 15:26:15.198858

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '444a44490f39'
down_revision: Union[str, None] = '49da0d86bd9f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('transactionuserlink',
    sa.Column('transaction_id', sa.Uuid(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['transaction_id'], ['transaction.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('transaction_id', 'user_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactionuserlink')
    # ### end Alembic commands ###
