from sqlalchemy import text

from server import db
from flask import current_app
from enum import Enum
from server.models.dtos.message_dto import NotificationDTO
from server.models.postgis.user import User
from server.models.postgis.task import Task
from server.models.postgis.project import Project
from server.models.postgis.utils import timestamp
from server.models.postgis.utils import NotFound


class Notification(db.Model):
    """ Describes a Notification for a user """

    __tablename__ = "notifications"

    __table_args__ = (db.ForeignKeyConstraint(["user_id"], ["users.id"]),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), index=True)
    unread_count = db.Column(db.Integer)
    date = db.Column(db.DateTime, default=timestamp)

    # Relationships
    user_id = db.relationship(User, foreign_keys=[user_id])

    def as_dto(self) -> NotificationDTO:
        """ Casts notification object to DTO """
        dto = NotificationDTO()
        dto.user_id = self.user_id
        dto.unread_count = self.unread_count
        dto.date = self.date

        return dto

    def update_notification_count(self):
        """ Add message into current transaction - DO NOT COMMIT HERE AS MESSAGES ARE PART OF LARGER TRANSACTIONS"""
        current_app.logger.debug("Updating notification count")
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_unread_message_count(user_id: int):
        """ Get count of unread messages for user """
        return Notification.query.filter(Notification.user_id == user_id).count()
