import fastapi

from .invites.routers import invites_router

groups_router = fastapi.APIRouter()

groups_router.include_router(
    invites_router, prefix='/invites', tags=['invites']
)
