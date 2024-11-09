import logging

import requests

from app.core.config import config

TELEGRAM_BOT_TOKEN = config.TOKEN_TELEGRAM_API


def send_telegram_message(chat_id: int, text: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    response = requests.post(url, json=payload)

    if response.status_code != 200:
        logging.error(f"Failed to send message to {chat_id}: {response.text}")
