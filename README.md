# newsREPORTERai 🚀📰

AI-driven news generation using Google Gemini + CrewAI agents. Surfaces emerging trends and turns them into insightful, reader-friendly articles.

![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux-blue)
![API](https://img.shields.io/badge/API-FastAPI-009688)
![LLM](https://img.shields.io/badge/LLM-Gemini%201.5%20Flash-8A2BE2)
![Orchestrator](https://img.shields.io/badge/Orchestrator-CrewAI-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## Highlights
- **Dual-Agent Pipeline**: `news_researcher` + `news_writer` orchestrated by CrewAI.
- **LLM**: Google Gemini (Gemini 1.5 Flash) via `langchain_google_genai`.
- **Search Tooling**: Serper-powered search for web research.
- **FastAPI Backend**: Modular API with health/readiness and generation endpoints.
- **Robust Fallback**: If CrewAI stack isn’t available, the system uses Gemini directly to ensure real content is returned.

---

## Table of Contents
- [Getting Started (Conda-first)](#getting-started-conda-first)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Troubleshooting & Notes](#troubleshooting--notes)
- [Roadmap](#roadmap)
- [FAQs](#faqs)
- [Contributing](#contributing)
- [Security](#security)

## Getting Started (Conda-first)

We recommend using Conda for a smooth macOS setup and a compatible `onnxruntime` build.

### 1) Clone
```bash
git clone https://github.com/austinLorenzMccoy/newREPORTERai.git
cd newREPORTERai
```

### 2) Environment variables
Create `backend/.env` (copy the example):
```bash
cp backend/.env.example backend/.env
```
Then populate at least:
- `GOOGLE_API_KEY=<your_google_api_key>`
- `SERPER_API_KEY=<your_serper_api_key>`

Optional service config:
- `APP_NAME`, `APP_ENV`, `LOG_LEVEL`, `PORT`, `CORS_ORIGINS`

### 3) Create the Conda environment
```bash
conda env create -f backend/environment.yml
conda activate newreporter_backend
```

### 4) (Optional) CrewAI-friendly pins
If you want a tighter dependency matrix for CrewAI + LangChain components:
```bash
pip install -r backend/requirements-crewai-full.txt
```

### 5) Run the API
```bash
uvicorn newreporter_backend.main:app \
  --app-dir backend \
  --host 127.0.0.1 \
  --port 8000 \
  --reload
```

Health checks:
```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/ready
```

### 6) Try the demo client
```bash
python backend/api_demo.py --base-url http://127.0.0.1:8000 --self-check
python backend/api_demo.py --base-url http://127.0.0.1:8000 --generate --topic "AI in healthcare"
```

Behavior:
- If the full CrewAI pipeline is available, you’ll get CrewAI-authored content and an `output_file` path (e.g., `new-blog-post.md`).
- If CrewAI imports fail (e.g., memory stack issues), the fallback produces real content via Gemini (no `output_file`).

---

## Project Structure
```
backend/
  environment.yml
  requirements-crewai-full.txt
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
    domain/
      agents.py
      tasks.py
      tools.py
    integrations/
      crew_runner.py
    services/
      __init__.py
      sample_service.py
  tests/
    __init__.py
    conftest.py
    test_health.py
    test_services_sample_service.py

new-blog-post.md        # Latest generated article (when using CrewAI with output)
```

---

## Architecture

High-level flow:

```
[Client / api_demo.py]
        |
        v
 [FastAPI /api/v1/generate]  -->  [integrations/crew_runner.run_generation]
                                        |  (Primary) CrewAI: Agents + Tasks
                                        |       - domain/agents.py (memory disabled by default)
                                        |       - domain/tasks.py
                                        |       - domain/tools.py (Serper search)
                                        |  (Fallback) Direct Gemini generation
                                        v
                                 [Article Markdown]
                                        |
                                        v
                              new-blog-post.md (when CrewAI writes output)
```

- CrewAI path yields richer, web-researched content and writes to `new-blog-post.md`.
- Fallback guarantees real output even if memory stack or imports fail.

---

## Screenshots

Add screenshots/GIFs of the API demo or rendered article here:

```
docs/
  screenshots/
    demo-call.png
    article-preview.png
```

---

## Endpoints
- `GET /health` – liveness
- `GET /ready` – readiness
- `GET /api/v1/ping` – sample
- `POST /api/v1/generate` – triggers the CrewAI workflow or the Gemini fallback

Example:
```bash
curl -X POST \
  http://127.0.0.1:8000/api/v1/generate \
  -H 'Content-Type: application/json' \
  -d '{"topic": "AI in healthcare"}'
```

---

## Testing
```bash
pytest backend/tests -q
```

---

## Troubleshooting & Notes
- **Conda + onnxruntime (macOS)**: The provided `backend/environment.yml` selects a compatible macOS build to avoid binary issues.
- **CrewAI vs Fallback**: The system always returns real content. When CrewAI is unavailable (e.g., memory deps), it falls back to direct Gemini generation.
- **API Keys**: Missing `GOOGLE_API_KEY` or `SERPER_API_KEY` will limit capabilities (no search or LLM). Ensure `backend/.env` is populated.
- **Port conflicts**: If `:8000` is busy, start uvicorn on another port, e.g., `--port 8010`, and pass the same base URL to `api_demo.py`.
- **Editable install (optional)**:
  ```bash
  pip install -e backend
  ```

---

## Roadmap
- [ ] Richer prompt templates for different verticals (e.g., fintech, biotech, energy)
- [ ] Streaming responses over SSE/WebSocket
- [ ] Pluggable search providers (Google, Tavily, Bing)
- [ ] Dockerfile + CI workflow
- [ ] Vector memory re-introduction with stable dependency profile

---

## FAQs
- **Why do I sometimes see a “Placeholder Article”?**
  - CrewAI executed but lacked live search context. Set `SERPER_API_KEY` in `backend/.env` and re-run.
- **How do I avoid macOS onnxruntime issues?**
  - Use the provided Conda env (`backend/environment.yml`) which selects a compatible build.
- **Where is the article saved?**
  - CrewAI path writes to `new-blog-post.md`; fallback returns content in the API response (no file).
- **Can I run without Conda?**
  - Yes, but Conda is recommended on macOS. A `backend/requirements.txt` exists if you prefer virtualenv.

## Contributing
Contributions are welcome! Fork the repo, create a feature branch, and open a PR. Please keep secrets out of git and use `.env` locally.

---

## Security
- Do not commit real API keys or secrets. Use `.env` locally and a secret manager in production.
- If sensitive keys were committed by mistake, rotate immediately and purge history if needed.

For more backend details, see `backend/README.md`.
