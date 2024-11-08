from aiohttp import ClientSession


async def get_nalog_data(ofd_string: str) -> dict:
    async with ClientSession() as session:
        url = 'https://proverkacheka.com/api/v1/check/get'
        data = {'qrraw': ofd_string}
        response = await session.post(url=url, json=data)
    if response.status != 200:
        return {}
    return await response.json()
