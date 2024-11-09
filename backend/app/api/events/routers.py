import fastapi

from .invites.routers import events_router

events_router = fastapi.APIRouter()

events_router.include_router(
    events_router, prefix='/invites', tags=['invites']
)
