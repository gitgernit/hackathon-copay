import app.api.auth
from app.api import api_router

api_router.include_router(app.api.auth.auth_router, prefix='/auth')
