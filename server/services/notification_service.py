import re
import time
import datetime

from cachetools import TTLCache, cached
from typing import List
from flask import current_app
from sqlalchemy import text, func

from server import create_app, db
from server.models.dtos.notification_dto import NotificationDTO
from server.models.postgis.notification import Notification


class NotificationService:
    @staticmethod
    def update_notification_count(user_id: int):
        current_unread_count = Notification.get_unread_message_count(user_id)
        new_notification = Notification()
        new_notification.user_id = user_id
        new_notification.unread_count = current_unread_count + 1
        new_notification.date = datetime.now()
