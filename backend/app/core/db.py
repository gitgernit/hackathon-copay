import sqlmodel

from app.core.config import config
from app.utils.factories import UserFactory

engine = sqlmodel.create_engine(config.DATABASE_URL)


def fill_with_sample_data():
    users = [
        {'id': 0, 'username': 'petr'},
        {'id': 1, 'username': 'aleksandr'},
        {'id': 2, 'username': 'seva'},
        {'id': 3, 'username': 'maksim'},
        {'id': 4, 'username': 'timur'},
        {'id': 5, 'username': 'roman'},
    ]
    UserFactory.bulk_new_users(users)

    events = []
