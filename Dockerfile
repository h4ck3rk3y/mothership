# Use the official Python 3.11 image from the Docker Hub
FROM python:3.11-slim

# Install necessary system packages
RUN apt-get update && apt-get install -y \
    sudo \
    docker.io \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user and grant it sudo privileges
RUN useradd -m dockeruser && echo "dockeruser:dockeruser" | chpasswd && adduser dockeruser sudo

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the Streamlit default port
EXPOSE 8501

# Switch to the non-root user
USER dockeruser

# Set the entrypoint to run Streamlit
ENTRYPOINT ["streamlit", "run", "mothership/frontend.py"]

