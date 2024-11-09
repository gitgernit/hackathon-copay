import fastapi

import app.api.auth.routers
import app.api.events.routers
import app.api.transactions.routers
import app.api.utils.routers
import app.api.transactions.routers

api_router = fastapi.APIRouter()

api_router.include_router(
    app.api.auth.routers.auth_router, prefix='/auth', tags=['auth']
)
api_router.include_router(
    app.api.utils.routers.utils_router, prefix='/utils', tags=['utils']
)
api_router.include_router(
    app.api.events.routers.events_router, prefix='/events', tags=['events']
)
api_router.include_router(
    app.api.transactions.routers.transactions_router,
    prefix='/transaction',
    tags=['transactions'],
)
