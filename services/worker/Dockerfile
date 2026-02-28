FROM python:3.12-slim

WORKDIR /app

# Install curl to download uv
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install uv under /root/.local/bin
ADD https://astral.sh/uv/install.sh /install.sh
RUN bash /install.sh && rm /install.sh
ENV PATH="/root/.local/bin:${PATH}"

# Copy dependencies
COPY pyproject.toml ./

# Install dependencies using uv
RUN uv sync

# Copy application source
COPY src ./src

# Expose API port
EXPOSE 8000

# Script to start either the API or the worker based on command
CMD ["uv", "run", "python", "-m", "src.main"]
