import aiogram.types

from app.core.config import config

inline_web_app_buttons = [
    [
        aiogram.types.InlineKeyboardButton(
            text='Запустить',
            web_app=aiogram.types.WebAppInfo(url=config.WEB_APP_URL),
        )
    ]
]
inline_web_app = aiogram.types.InlineKeyboardMarkup(
    inline_keyboard=inline_web_app_buttons
)
