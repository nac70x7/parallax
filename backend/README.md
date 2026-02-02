# Parallax Backend

Python backend for Parallax research orchestration.

## Setup

```bash
python3.11 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
```

## Run

```bash
uvicorn parallax.api.main:app --reload
```

API docs: http://localhost:8000/docs
