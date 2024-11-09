import fastapi

import app.api.routers
import app.core.db

app_router = fastapi.FastAPI()

app_router.include_router(
    app.api.routers.api_router,
    prefix='/api',
)

app.core.db.test_conn()
