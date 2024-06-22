DOCKER_IMAGE = "n3d1117/chatgpt-telegram-bot:latest"
import subprocess


def run_bot(
    open_ai_api_key,
    telegram_bot_token,
    system_prompt,
    bot_language,
    admin_user_ids,
    allowed_user_ids,
    open_ai_model,
):
    environment_vars = {
        "OPENAI_API_KEY": open_ai_api_key,
        "TELEGRAM_BOT_TOKEN": telegram_bot_token,
        "ASSISTANT_PROMPT": system_prompt,
        "BOT_LANGUAGE": bot_language,
        "ADMIN_USER_IDS": admin_user_ids,
        "ALLOWED_USER_IDS": allowed_user_ids,
        "OPEN_AI_MODEL": open_ai_model,
    }

    env_vars_str = " ".join(
        [f'-e {key}="{value}"' for key, value in environment_vars.items()]
    )

    docker_command = f"docker run -d {env_vars_str} {DOCKER_IMAGE}"

    process = subprocess.run(
        docker_command,
        shell=True,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    output = process.stdout
    error = process.stderr
    exit_code = process.returncode

    if exit_code != 0:
        return exit_code, error

    return exit_code, output
