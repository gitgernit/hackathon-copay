from fastapi.testclient import TestClient

from app.api.transactions.routers import transactions_router

client = TestClient(transactions_router)


def test_transactions() -> None:
    # create_transaction = auth_client.post('/token', json=telegram_init_data)
    # assert auth_response.status_code == 200, 'Failed to authenticate'
    #
    # token = auth_response.json().get('access_token')
    # assert token is not None, 'Token not found in response'

    # headers = {'Authorization': f'Bearer {token}'}

    event_data = {
        {
            'title': 'vodka',
            'price': 1000,
            'all_users_selected': False,
        },
    }

    assert event_data
