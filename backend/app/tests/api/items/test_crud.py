from fastapi.testclient import TestClient

from app.api.items.routers import items_router

client = TestClient(items_router)


def test_items() -> None:
    # create_transaction = auth_client.post('/token', json=telegram_init_data)
    # assert auth_response.status_code == 200, 'Failed to authenticate'
    #
    # token = auth_response.json().get('access_token')
    # assert token is not None, 'Token not found in response'

    # headers = {'Authorization': f'Bearer {token}'}

    event_data = [
        {
            'title': 'vodka',
            'price': 1000,
            'all_users_selected': False,
        },
    ]

    assert event_data
