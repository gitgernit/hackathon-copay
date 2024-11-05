import app.api.routes
import fastapi

app_router = fastapi.FastAPI()

app_router.include_router(
    app.api.routes.api_router,
    prefix='/api',
)
