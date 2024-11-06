from app.api.utils.routers import utils_router


@utils_router.get('/health-check')
def health_check():
    return 'healthy'
