import logging

from aiohttp import ClientSession


async def get_nalog_data(ofd_string: str) -> dict:
    async with ClientSession() as session:
        url = 'https://proverkacheka.com/api/v1/check/get'
        data = {'qrraw': ofd_string, 'token': '29956.3zEV2Vj2Z3BXQfGqY'}
        response = await session.post(
            url=url,
            data=data,
            headers={
                'Content-Type': (
                    'application/x-www-form-urlencoded;' ' charset=UTF-8'
                )
            },
        )
    if response.status != 200:
        logging.error('Received non-200 status on ofd check')
        return
    data = await response.json()
    if data['code'] == 1:
        return data
    logging.error(
        f'Received non-success status on ofd request with data: {data}'
    )
    return
