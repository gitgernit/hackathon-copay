import asyncio
import logging
import sys

import aiogram.client.default
import aiogram.dispatcher.dispatcher

from app.core.config import config
import app.routing.routers

bot = aiogram.Bot(token=config.TOKEN_TELEGRAM_API)
dp = aiogram.dispatcher.dispatcher.Dispatcher()

dp.include_router(app.routing.routers.routing_router)


async def main() -> None:
    await dp.start_polling(bot)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
