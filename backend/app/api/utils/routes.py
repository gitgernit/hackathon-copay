import typing

from fastapi import Query

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
)
async def ofd(
    ofd_string: typing.Annotated[
        str, Query(description='Bare string from QR code')
    ],
) -> list[Item] | BasicResponse:
    try:
        return OfdResponse(**await get_nalog_data(ofd_string)).data.items

    except Exception:
        return BasicResponse(
            detail='Error while getting information about check'
        )
