from fastapi import APIRouter
from fastapi import Depends

from app.api.auth.deps import BearerAuth

items_router = APIRouter(
    dependencies=[Depends(BearerAuth())],
)
