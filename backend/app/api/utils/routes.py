import typing

from fastapi import HTTPException, Query

from app.api.utils.routers import utils_router
from app.models.base import BasicResponse, OfdRequest
from app.models.ofd import OfdResponse, Item
from app.utils.nalog import get_nalog_data


@utils_router.get('/health-check')
def health_check() -> dict[str, str]:
    return {'msg': 'healthy'}


@utils_router.post(
    '/ofd',
    description='Get items info from OFD bare string',
)
async def ofd(
    ofd: OfdRequest
) -> typing.List[Item]:
    data = await get_nalog_data(ofd.ofd_string)
    if not data:
        raise HTTPException(status_code=400, detail="Bad OFD data")
    try:
        return data['data']['json']['items']

    except Exception as e:
        raise HTTPException(
            detail='Error while getting information about check', status_code=500
        )
