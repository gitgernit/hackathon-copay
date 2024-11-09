from fastapi.testclient import TestClient
import sqlmodel

from app.api.events.routers import events_router
import app.core.db
from app.models.event import Event
from app.tests.api.mockdata import auth_client
from app.tests.api.mockdata import telegram_init_data

client = TestClient(events_router)


def test_events() -> None:
    auth_response = auth_client.post('/token', json=telegram_init_data)
    assert auth_response.status_code == 200, 'Failed to authenticate'

    token = auth_response.json().get('access_token')
    assert token is not None, 'Token not found in response'

    # Step 2: Use the token as a header for authorization
    headers = {'Authorization': f'Bearer {token}'}

    # Step 3: Post to create an event with a request body containing "name"
    event_data = {'name': 'Sample Event Name'}

    response = client.post('/', headers=headers, json=event_data)
    response_event = response.json()

    assert response.status_code == 200, 'Event creation failed'

    with sqlmodel.Session(app.core.db.engine) as session:
        event = session.get(Event, response_event['id'])
        assert event.name == event_data['name'], 'Wrong name for event'

    response = client.get('/', headers=headers)
    response_events = response.json()

    assert response.status_code == 200, 'Event info getting failed'
