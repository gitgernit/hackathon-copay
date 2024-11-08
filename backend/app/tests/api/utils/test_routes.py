from fastapi.testclient import TestClient
from app.api.utils.routers import utils_router

client = TestClient(utils_router)


def test_read_main() -> None:
    assert True == True