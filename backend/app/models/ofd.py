from pydantic import BaseModel


class OfdRequest(BaseModel):
    qr_data: str


class Item(BaseModel):
    name: str
    price: int
    quantity: int
    sum: int


class Data(BaseModel):
    user: str
    retailPlaceAddress: str
    userInn: str
    ticketDate: str
    requestNumber: int
    shiftNumber: int
    operator: str
    operationType: int
    items: list[Item]
    nds18: int | None
    nds10: int | None
    nds0: int | None
    ndsNo: int | None
    totalSum: int
    cashTotalSum: int | None
    ecashTotalSum: int | None
    taxationType: int
    kktRegId: str
    kktNumber: str
    fiscalDriveNumber: str
    fiscalDocumentNumber: int
    fiscalSign: int


class RequestManual(BaseModel):
    fn: str
    fd: str
    fp: str
    check_time: str
    type: int
    sum: float


class Request(BaseModel):
    qrurl: str
    qrfile: str
    qrraw: str
    manual: RequestManual


class OfdResponse(BaseModel):
    code: int
    first: int
    data: Data
    html: str
    request: Request
