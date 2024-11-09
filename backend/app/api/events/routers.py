import fastapi

from .invites.routers import events_router

groups_router = fastapi.APIRouter()

groups_router.include_router(
    events_router, prefix='/invites', tags=['invites']
)
