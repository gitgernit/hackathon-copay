<<<<<<< HEAD
import typing

=======
import logging
from typing import List
from fastapi import Depends, HTTPException
>>>>>>> 08f27ae (chore: some swagger stuff)
from fastapi import Query

from app.api.utils.routers import utils_router
from app.models.base import BasicResponse, OfdRequest
from app.models.ofd import Data, Item
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
<<<<<<< HEAD
    ofd_string: typing.Annotated[
        str, Query(description='Bare string from QR code')
    ],
) -> list[Item] | BasicResponse:
=======
    ofd: OfdRequest
) -> List:
    data = await get_nalog_data(ofd.ofd_string)
    if not data:
        raise HTTPException(status_code=400, detail="Bad OFD data")
>>>>>>> 08f27ae (chore: some swagger stuff)
    try:
        return OfdResponse(**await get_nalog_data(ofd_string)).data.items

    except Exception:
        return BasicResponse(
            detail='Error while getting information about check'
        )
