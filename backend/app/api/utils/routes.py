from fastapi import Depends
from fastapi import Query

from app.api.auth.deps import BearerAuth
from app.api.utils.routers import utils_router
from app.models.base import BasicResponse
from app.models.ofd import Item
from app.models.ofd import OfdResponse
from app.utils.nalog import get_nalog_data


@utils_router.get('/health-check')
def health_check() -> dict[str, str]:
    return {'msg': 'healthy'}


@utils_router.post(
    '/ofd',
    description='Get items info from OFD bare string',
    dependencies=[Depends(BearerAuth())],
    responses={401: {'description': 'Unauthorized', 'model': BasicResponse}},
)
async def ofd(
    ofd_string: str = Query(description='Bare string from QR code'),
) -> list[Item]:
    try:
        return OfdResponse(**await get_nalog_data(ofd_string)).data.items
    except Exception:
        return BasicResponse(
            detail='Error while getting information about check'
        )
