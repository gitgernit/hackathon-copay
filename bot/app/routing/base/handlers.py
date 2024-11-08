import aiogram.types
from app.routing.base.routers import base_router


@base_router.message(aiogram.F.content_type == 'text')
async def start(message: aiogram.types.Message) -> None:
    await message.reply(str(message.text))
