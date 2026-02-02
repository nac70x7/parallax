# Parallax

> Multi-LLM Research Orchestration Service

**Status: In Development**

## What It Does

Parallax dispatches research queries to multiple AI engines (Perplexity, Kimi, etc.) in parallel, normalizes their responses into unified claims, and cross-validates across sources. It surfaces conflicts where engines disagree and synthesizes a final output with confidence scores and citations.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | Python 3.11+, FastAPI, Pydantic AI, httpx |
| Frontend | Expo, React Native |

## Project Structure

```
parallax/
├── backend/
│   ├── src/parallax/
│   │   ├── api/          # FastAPI routes
│   │   ├── models/       # Pydantic data models
│   │   ├── agents/       # Pydantic AI agents
│   │   ├── engines/      # LLM integrations
│   │   └── services/     # Business logic
│   └── tests/
└── frontend/             # (coming soon)
```

## Setup

### Backend

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
# Add your API keys to .env
uvicorn parallax.api.main:app --reload
```

API docs: http://localhost:8000/docs

### Frontend

Coming soon.
