from app.models.user import User
from fastapi import Depends, Query, Request, Response

from app.api.utils.routers import utils_router
from app.api.auth.deps import BearerAuth, get_current_user
from app.models.ofd import OfdRequest, Item, OfdResponse
from app.models.base import BasicResponse
from app.utils.nalog import get_nalog_data

@utils_router.get('/health-check')
def health_check() -> dict[str, str]:
    return {'msg': 'healthy'}


@utils_router.post("/ofd", description="Get items info from OFD bare string", dependencies=[Depends(BearerAuth())], responses={
    401: {"description": "Unauthorized", "model": BasicResponse}
})
async def ofd(user: User = Depends(get_current_user), ofd_string: str = Query(description="Bare string from QR code")) -> list[Item]:
    return OfdResponse(**await(get_nalog_data(ofd_string))).data.items
