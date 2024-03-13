# Copyright 2018-2022 Streamlit Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import streamlit as st
from streamlit.logger import get_logger
from run_bot import run_bot

LOGGER = get_logger(__name__)


def run():
    st.set_page_config(
        page_title="Mothership",
        page_icon="🛸",
    )

    with st.sidebar:

        st.write("# Welcome to Mothership! 🛸")

        st.markdown(
            """
            Mothership allows you to deploy Telegram bots like never before!
            ### We just need
            - Your [OPEN_AI_API_KEY](https://platform.openai.com/docs/quickstart?context=python)
            - The tone that you want your bot behave as
            - The Telegram Bot token that you can get from [BotFather](https://telegram.me/BotFather)
        """)

        st.write("## Launch a bot now")

    with st.form("new_bot"):
        st.write("### Required")
        open_ai_api_key = st.text_input("OpenAI API Key", type="password")
        telegram_bot_token = st.text_input("Telegram Bot Token", type="password")
        system_prompt = st.text_area("The prompt on which the bot should operate be as specific as possible", value="You are a helpful assistant.")
        bot_language = st.selectbox("Language for the bots general messages", ["en", "de", "ru", "it", "fi", "es", "id", "nl", "zh-cn", "vi", "fa", "pt-br", "uk"])

        st.divider()
        st.write("### Optional")
        admin_user_ids = st.text_input("Comma separated admin user ids; not required", value = "")
        allowed_user_ids  = st.text_input("Allowed user ids; defaults to '*' to allow all", value="*")
        open_ai_model  = st.text_input("The OpenAI model to use for the bot", value="gpt-3.5-turbo")


        # Every form must have a submit button.
        submitted = st.form_submit_button("Submit")
        if submitted:
            if open_ai_api_key == "" or telegram_bot_token == "" or system_prompt == "":
                st.error("Required fields were not filled")
                return
            st.write("Thank you we are launching your bot!")
            exit_code, output = run_bot(open_ai_api_key, telegram_bot_token, system_prompt, bot_language, admin_user_ids, admin_user_ids, open_ai_model)
            if exit_code != 0:
                st.error(output)
            else:
                st.write("Your bot is alive and running")

if __name__ == "__main__":
    run()