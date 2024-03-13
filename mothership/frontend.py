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
    
    open_ai_api_key = st.text_input("OpenAI API Key", type="password")
    telegram_bot_token = st.text_input("Telegram Bot Token", type="password")



if __name__ == "__main__":
    run()