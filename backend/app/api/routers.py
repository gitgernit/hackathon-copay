import fastapi

import app.api.auth.routers
import app.api.groups.routers
import app.api.utils.routers

api_router = fastapi.APIRouter()

api_router.include_router(
    app.api.auth.routers.auth_router, prefix='/auth', tags=['auth']
)
api_router.include_router(
    app.api.utils.routers.utils_router, prefix='/utils', tags=['utils']
)
api_router.include_router(
    app.api.groups.routers.groups_router, prefix='/groups', tags=['groups']
)
