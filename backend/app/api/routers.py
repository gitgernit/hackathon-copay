import fastapi

import app.api.auth.routers

api_router = fastapi.APIRouter()

api_router.include_router(app.api.auth.routers.auth_router, prefix='/auth')
