from typing import Any

from pydantic import BaseModel


class TelegramWebUser(BaseModel):
    id: int
    first_name: str
    last_name: str | None = ""
    username: str | None = "" 
    language_code: str | None = ""
    is_premium: bool = False
    added_to_attachment_menu: bool = False
    allows_write_to_pm: bool = False
    photo_url: str | None = ""


class TelegramInputData(BaseModel):
    query_id: str | None = ""
    user: TelegramWebUser
    receiver: Any = ""
    chat: Any = ""
    chat_type: str | None = ""
    chat_instance: str | None = ""
    start_param: str | None = ""
    can_send_after: int | None = ""
    auth_date: int
    hash: str
