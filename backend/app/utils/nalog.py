from datetime import datetime
from urllib.parse import parse_qs

from aiohttp import ClientSession


async def get_nalog_data(ofd_string: str) -> dict:
    async with ClientSession() as session:
        items = {k: v[0] for k, v in parse_qs(ofd_string).items()}

        url = 'https://ofd.ru/api/partner/v3/receipts/GetReceipt'
        data = {
            'TotalSum': items['s'],
            'DocDateTime': datetime.strptime(
                items['t'], '%Y%m%dT%H%M%S'
            ).isoformat(),
            'FnNumber': items['fn'],
            'ReceiptOperationType': 1,
            'DocNumber': items['n'],
            'DocFiscalSign': items['i'],
            'TokenSecret': 'q23123',  # todo change this
        }
        response = await session.post(url=url, json=data)
    if response.status != 200:
        return {}
    return await response.json()
