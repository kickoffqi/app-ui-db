# apps/api/Dockerfile
# FastAPI + Uvicorn

FROM python:3.11-slim

# Prevents Python from writing pyc files and buffers stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# System deps (optional but common)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install deps first for better layer caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . ./

EXPOSE 8000

# Use uvicorn directly; keep host 0.0.0.0 for containers
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]