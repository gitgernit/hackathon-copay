"""fix bigints

Revision ID: 3f6feff5972e
Revises: 0eb89d53f0d4
Create Date: 2024-11-10 11:49:31.092386

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3f6feff5972e'
down_revision: Union[str, None] = '0eb89d53f0d4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('event', 'owner_id',
               existing_type=sa.INTEGER(),
               type_=sa.BigInteger(),
               nullable=True)
    op.alter_column('eventuserlink', 'user_id',
               existing_type=sa.INTEGER(),
               type_=sa.BigInteger(),
               existing_nullable=False)
    op.alter_column('itemuserlink', 'user_id',
               existing_type=sa.INTEGER(),
               type_=sa.BigInteger(),
               existing_nullable=False)
    op.alter_column('transaction', 'payer_id',
               existing_type=sa.INTEGER(),
               type_=sa.BigInteger(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('transaction', 'payer_id',
               existing_type=sa.BigInteger(),
               type_=sa.INTEGER(),
               nullable=False)
    op.alter_column('itemuserlink', 'user_id',
               existing_type=sa.BigInteger(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('eventuserlink', 'user_id',
               existing_type=sa.BigInteger(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('event', 'owner_id',
               existing_type=sa.BigInteger(),
               type_=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
