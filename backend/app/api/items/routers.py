from fastapi import APIRouter, Depends

from app.api.auth.deps import BearerAuth

items_router = APIRouter(
    dependencies=[Depends(BearerAuth())],
)
