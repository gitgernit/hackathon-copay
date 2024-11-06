import fastapi

import app.api.routers

app_router = fastapi.FastAPI()

app_router.include_router(
    app.api.routers.api_router,
    prefix='/api',
)
