import aiogram

import app.routing.base.routers

routing_router = aiogram.Router(name=__package__)

routing_router.include_routers(
    app.routing.base.routers.base_router,
)
