"""empty message

Revision ID: 84c793a951b2
Revises: 772aff899389
Create Date: 2019-11-12 20:04:46.065237

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84c793a951b2'
down_revision = '772aff899389'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "notifications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.BigInteger(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.Column("unread_count", sa.Integer(), nullable=False),
        sa.Column("date", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id", name="notifications_pkey"),
    )
    op.create_index(
        "idx_notifications_user_id",
        "notifications",
        ["user_id"],
        unique=False,
    )


def downgrade():
    op.drop_index(
        "idx_notifications_user_id",
        table_name="notifications",
    )
    op.drop_table("notifications")
