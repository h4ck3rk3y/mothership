import os
import requests

KOYEB_API_KEY = os.environ["KOYEB_API_KEY"]
KOYEB_API = "https://app.koyeb.com/v1"
DOCKER_IMAGE = "n3d1117/chatgpt-telegram-bot:latest"
KOYEB_APP_ID = "c02d59cd-c3f5-4568-b647-b43d8db925a5"

HEADERS = {
    "Authorization": f"Bearer {KOYEB_API_KEY}",
    "Content-Type": "application/json"
}


def launch_bot(bot):
    bot_id = bot.id
    assistant_prompt = bot.system_prompt
    try:
        name = f"BOT_{bot_id}"
        create_secret()

        service_name = f"bot-{bot_id}"
        service_data = {
            "app_id": KOYEB_APP_ID,
            "definition": {
                "name": service_name,
                "type": "WORKER",
                "instance_types": ["nano"],
                "scalings": [{"min": 1, "max": 1}],
                "env": [
                    {"key": "ASSISTANT_PROMPT", "value": assistant_prompt},
                    {"key": "TELEGRAM_BOT_TOKEN", "secret": secret_name},
                    {"key": "OPEN_AI_API_KEY", "secret": "OPEN_AI_API_KEY"}
                ],
                "docker": {
                    "image": DOCKER_IMAGE
                }
            }
        }
        service_response = requests.post(f"{KOYEB_API_URL}/services", headers=headers, json=service_data)
        service_response.raise_for_status()
        service_json = service_response.json()
        return True, service_json["id"]

    except requests.exceptions.RequestException as e:
        return False, ""


def create_secret(name, value):
    data = {
        "name": name,
        "value": value
    }
    resp = requests.get(f"{KOYEB_API}/secets", headers=HEADERS, json=data)
    resp.raise_for_status()
