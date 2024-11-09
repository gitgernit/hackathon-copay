from app.models.item import Item
from app.models.item import ItemRequest

from .routers import items_router


@items_router.post('/{transaction_id}')
async def create_item(item: ItemRequest) -> Item: ...
