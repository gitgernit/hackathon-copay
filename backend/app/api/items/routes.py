from .routers import items_router
from app.models.item import ItemRequest, Item


@items_router.post("/{transaction_id}")
async def create_item(
    item: ItemRequest
) -> Item:
    ...
