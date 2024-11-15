import aiogram.filters
import aiogram.types

import app.core.layouts
import app.core.prompts
from app.routing.base.routers import base_router


@base_router.message(aiogram.filters.Command('start'))
async def start(message: aiogram.types.Message) -> None:
    await message.reply(
        app.core.prompts.GREETING, reply_markup=app.core.layouts.inline_web_app
    )
