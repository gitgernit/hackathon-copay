from fastapi import HTTPException

from app.api.utils.routers import utils_router
from app.models.base import OfdRequest
from app.models.ofd import Item
from app.utils.nalog import get_nalog_data


@utils_router.get('/health-check')
def health_check() -> dict[str, str]:
    return {'msg': 'healthy'}


@utils_router.post(
    '/ofd',
    description='Get items info from OFD bare string',
)
async def ofd(ofd: OfdRequest) -> list[Item]:
    data = await get_nalog_data(ofd.ofd_string)
    if not data:
        raise HTTPException(status_code=400, detail='Bad OFD data')
    try:
        return data['data']['json']['items']

    except Exception:
        raise HTTPException(
            detail='Error while getting information about check',
            status_code=500,
        )
