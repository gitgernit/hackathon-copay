import fastapi

import app.api.groups.invites.routers

groups_router = fastapi.APIRouter()

groups_router.include_router(
    app.api.groups.invites.routers.invites_router, prefix='/invites'
)
