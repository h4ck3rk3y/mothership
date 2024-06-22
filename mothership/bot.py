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


def launch_bot(bot):
    bot_id = bot.id
    assistant_prompt = bot.system_prompt
    bot_token = bot.token
    try:
        name = f"BOT_{bot_id}"
        secret_name = f"BOT_TOKEN_{bot_id}"
        
        # Create secret (assuming this function is defined elsewhere)
        create_secret(secret_name, bot_token)

        service_name = f"bot-{bot_id}"
        service_data = {
            "app_id": KOYEB_APP_ID,
            "definition": {
                "name": service_name,
                "type": "WORKER",
                "instance_types": ["free"],
                "regions": ["FRA"],
                "scalings": [{"min": 1, "max": 1}],
                "env": [
                    {"key": "ASSISTANT_PROMPT", "value": assistant_prompt},
                    {"key": "TELEGRAM_BOT_TOKEN", "secret": secret_name},
                    {"key": "OPEN_AI_API_KEY", "secret": "OPEN_AI_API_KEY"},
                ],
                "docker": {"image": DOCKER_IMAGE},
            },
        }
        
        service_response = requests.post(
            f"{KOYEB_API_URL}/services", headers=HEADERS, json=service_data
        )
        service_response.raise_for_status()
        service_json = service_response.json()
        return True, service_json["id"]
    
    except requests.exceptions.RequestException as e:
        error_detail = str(e)
        if e.response is not None:
            status_code = e.response.status_code
            try:
                error_json = e.response.json()
                error_detail = f"Status {status_code}: {error_json.get('message', 'Unknown error')}"
            except ValueError:
                error_detail = f"Status {status_code}: {e.response.text}"
        
        print(f"Error launching bot {bot_id}: {error_detail}")
        return False, f"Error: {error_detail}"
    
    except Exception as e:
        error_detail = f"Unexpected error: {str(e)}"
        print(f"Error launching bot {bot_id}: {error_detail}")
        return False, f"Error: {error_detail}"


def create_secret(name, value):
    data = {"name": name, "value": value}
    resp = requests.get(f"{KOYEB_API}/secets", headers=HEADERS, json=data)
    resp.raise_for_status()


def get_service_status(service_id):
    try:
        response = requests.get(
            f"{KOYEB_API_URL}/services/{service_id}", headers=HEADERS
        )
        response.raise_for_status()
        service_data = response.json()
        return service_data.get("status", "Unknown")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching service status: {str(e)}")
        return "Unknown"
