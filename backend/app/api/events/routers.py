import fastapi

# from .invites.routers import invites_router

events_router = fastapi.APIRouter()

# events_router.include_router(
#     invites_router, prefix='/invites', tags=['invites']
# )
