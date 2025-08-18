# NEWREPORTER Backend

A modular FastAPI backend for NEWREPORTER with pytest, packaging, and environment-based configuration.

## Features
- FastAPI app with modular routers (`/api/v1`)
- Health and readiness endpoints (`/health`, `/ready`)
- Typed config, .env support
- pytest test suite
- Packaging via `pyproject.toml` and `setup.py`
- Demo client script (`api_demo.py`)

## Project Structure
```
backend/
  pyproject.toml
  setup.py
  requirements.txt
  pytest.ini
  README.md
  .env.example
  api_demo.py
  newreporter_backend/
    __init__.py
    config.py
    main.py
    api/
      __init__.py
      routes.py
      health.py
      schemas.py
      deps.py
    services/
      __init__.py
      sample_service.py
    tests/
      __init__.py
      conftest.py
      test_health.py
```

## Quickstart
1) Create and activate a virtual environment
```
python3 -m venv backend_env
source backend_env/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

2) Configure environment
```
cp backend/.env.example backend/.env
# Edit backend/.env as needed
```

3) Run the API
```
uvicorn newreporter_backend.main:app --reload --port 8000
```

4) Health check
```
curl http://127.0.0.1:8000/health
```

5) Run tests
```
pytest backend/tests -q
```

## Config
- File: `backend/.env` (ignore in VCS). Example in `backend/.env.example`.
- Variables:
  - `APP_NAME`: service name
  - `APP_ENV`: development|staging|production
  - `LOG_LEVEL`: debug|info|warning|error
  - `PORT`: server port
  - `CORS_ORIGINS`: comma-separated list or `*`

## Endpoints
- `GET /health` – liveness
- `GET /ready` – readiness
- `GET /api/v1/ping` – example route
- `POST /api/v1/generate` – triggers the CrewAI workflow using the project's `agents.py`/`tasks.py` (body: `{ "topic": "..." }`)

### Example Usage
```bash
curl -X POST \
  http://127.0.0.1:8000/api/v1/generate \
  -H 'Content-Type: application/json' \
  -d '{"topic": "example_topic"}'
```

## Demo Client
Run after starting the API:
```
python backend/api_demo.py --base-url http://127.0.0.1:8000
```
Use the `--generate` option to trigger the CrewAI workflow:
```
python backend/api_demo.py --base-url http://127.0.0.1:8000 --generate --topic "example_topic"
```

## Packaging
- Install in editable mode:
```
pip install -e backend
```

## Notes
- Keep secrets out of git. Use `.env` locally, and secret managers in production.
- Prefer `backend/pyproject.toml` as the source of truth; `requirements.txt` mirrors runtime deps for convenience.
