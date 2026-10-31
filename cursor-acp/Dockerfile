FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://cursor.com/install | bash \
    && cp /root/.local/bin/agent /usr/local/bin/agent \
    && chmod 755 /usr/local/bin/agent

WORKDIR /app

RUN useradd --create-home --uid 10001 appuser

COPY pyproject.toml /app/
COPY app /app/app

RUN pip install --upgrade pip && pip install . \
    && mkdir -p /var/lib/cursor-acp/sessions \
    && chown -R appuser:appuser /app /var/lib/cursor-acp

USER appuser

ENV ACP_BRIDGE_HOST=127.0.0.1 \
    SESSION_WORKDIR_ROOT=/var/lib/cursor-acp/sessions

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"]
