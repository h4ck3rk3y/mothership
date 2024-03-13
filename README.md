Here's the updated README for your project, focusing on Unix-like systems and providing a more accurate description of the app's functionality.

---

# Mothership

Welcome to the Mothership project! This repository hosts a Python-based application designed to simplify the creation of Telegram bots. Utilizing a straightforward Streamlit frontend, it empowers users to configure and deploy their bots with minimal effort.

## Prerequisites

Ensure Python 3.7 or higher is installed on your system to use Mothership.

## Installation

### Install Poetry

Poetry is our chosen tool for dependency management and packaging. It helps in declaring project libraries and manages their installation.

To install Poetry on Unix, Linux, or macOS, run:

```bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

Make sure to add Poetry's `bin` directory to your `PATH` after installation.

### Setup the Project

Clone the Mothership repository:

```bash
git clone https://github.com/h4ck3rk3y/mothership.git
cd mothership
```

Install project dependencies using Poetry:

```bash
poetry install
```

This command will install all dependencies listed in `pyproject.toml`.

## Running the Frontend

The application's frontend is built with Streamlit. To launch the Streamlit interface, execute:

```bash
poetry run streamlit run mothership/frontend.py
```

Streamlit will start and provide a local URL to access the frontend. Open this URL in your browser to begin creating your Telegram bot.

---

Thank you for exploring the Mothership project. This tool aims to make the process of creating and deploying Telegram bots as straightforward as possible. If you have any questions or feedback, please don't hesitate to open an issue in the GitHub repository.