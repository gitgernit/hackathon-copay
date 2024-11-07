from fastapi.testclient import TestClient
from app.api.utils.routers import utils_router

client = TestClient(utils_router)


def test_read_main():
    response = client.get('/health-check')
    assert response.status_code == 200
    assert response.json() == {'msg': 'healthy'}
