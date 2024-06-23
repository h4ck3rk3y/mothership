import os
import requests

KOYEB_API_KEY = os.environ["KOYEB_API_KEY"]
KOYEB_API = "https://app.koyeb.com/v1"
DOCKER_IMAGE = "n3d1117/chatgpt-telegram-bot:latest"
KOYEB_APP_ID = "c02d59cd-c3f5-4568-b647-b43d8db925a5"

HEADERS = {
    "Authorization": f"Bearer {KOYEB_API_KEY}",
    "Content-Type": "application/json",
}


def launch_bot(bot, name_suffix):
    assistant_prompt = bot.system_prompt
    bot_token = bot.token
    try:
        secret_name = f"bot-token-{name_suffix}"
        create_secret(secret_name, bot_token)

        service_name = f"bot-{name_suffix}"
        print(f"launching bot with name {service_name}")
        service_data = {
            "app_id": KOYEB_APP_ID,
            "definition": {
                "name": service_name,
                "type": "WORKER",  # Make sure this is a valid type, not "INVALID"
                "instance_types": [{"type": "eco-nano"}],
                "regions": ["fra"],  # Lowercase to match typical region codes
                "scalings": [{"min": 1, "max": 1}],
                "env": [
                    {"key": "ASSISTANT_PROMPT", "value": assistant_prompt},
                    {"key": "TELEGRAM_BOT_TOKEN", "secret": secret_name},
                    {"key": "OPENAI_API_KEY", "secret": "OPEN_AI_API_KEY"},
                ],
                "docker": {"image": DOCKER_IMAGE},
                # Add required fields even if they're empty
                "routes": [],
                "ports": [],
                "health_checks": [],
                "volumes": [],
            },
        }

        service_response = requests.post(
            f"{KOYEB_API}/services", headers=HEADERS, json=service_data
        )

        if service_response.status_code == 400:
            error_detail = service_response.json()
            print(f"Koyeb API 400 Error: {error_detail}")
            return False, f"Koyeb API Error: {error_detail}"

        service_response.raise_for_status()
        service_json = service_response.json()
        print(service_json)
        return True, service_json["service"]["id"]

    except requests.exceptions.RequestException as e:
        error_detail = str(e)
        if e.response is not None:
            try:
                error_json = e.response.json()
                error_detail = f"Status {e.response.status_code}: {error_json}"
            except ValueError:
                error_detail = f"Status {e.response.status_code}: {e.response.text}"

        print(f"Error launching bot {bot_id}: {error_detail}")
        return False, f"Error: {error_detail}"

    except Exception as e:
        error_detail = f"Unexpected error: {str(e)}"
        print(f"Error launching bot {bot_id}: {error_detail}")
        return False, f"Error: {error_detail}"


def create_secret(name, value):
    data = {"name": name, "value": value}
    resp = requests.post(f"{KOYEB_API}/secrets", headers=HEADERS, json=data)
    resp.raise_for_status()
    print(f"Succesfully created secret {name}")


def get_service_status(service_id):
    try:
        response = requests.get(f"{KOYEB_API}/services/{service_id}", headers=HEADERS)
        response.raise_for_status()
        service_data = response.json()
        return service_data["service"].get("status", "Unknown")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching service status: {str(e)}")
        return "Unknown"


def update_bot_on_koyeb(bot):
    raise Exception("Unimplemented error")
