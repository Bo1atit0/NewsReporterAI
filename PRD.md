# Product Requirements Document (PRD)

Product: newREPORTER.ai
Owner: YOU (Maintainer)
Last updated: 2025-08-18

## 1) Overview
newREPORTER.ai generates research-backed technology articles using CrewAI agents (Researcher, Writer) powered by Google Gemini and web search tooling. A FastAPI backend exposes operational health endpoints and a generation endpoint to invoke the Crew workflow programmatically.

## 2) Goals
- Provide a simple, robust API to trigger article generation from a topic.
- Keep the agents and tasks loosely coupled from the HTTP layer (clean separations).
- Support local development with .env and easy testing via pytest.
- Ship basic observability (health/readiness) and clean error surfaces.

## 3) Non-goals
- User authentication/authorization (future work).
- Persistent DB storage (results written to file for now).
- Multi-tenant rate limiting or quotas.

## 4) Users / Personas
- Tech Writer / Researcher: triggers article creation from topics.
- Developer: integrates the API into internal tools or UIs.

## 5) System Architecture
- CrewAI Domain (root): `agents.py`, `tasks.py`, `tools.py`, optional `crew.py` (manual kickoff script), `.env` for API keys.
- Backend (FastAPI): `backend/newreporter_backend/` with routers, config, integrations, tests.
- Integration boundary: `backend/newreporter_backend/integrations/crew_runner.py` imports domain code and executes `crew.kickoff`.

## 6) Modules
- `agents.py`: defines `news_researcher`, `news_writer` (Gemini + Serper tool).
- `tasks.py`: defines `research_task`, `write_task` (writes `new-blog-post.md`).
- `tools.py`: sets up `SerperDevTool` and loads API keys.
- `backend/newreporter_backend/api`: FastAPI routes and schemas.
- `backend/newreporter_backend/config.py`: settings loader from `.env`.
- `backend/newreporter_backend/integrations/crew_runner.py`: orchestrates the Crew.

## 7) API
- GET `/health`: liveness.
- GET `/ready`: readiness.
- GET `/api/v1/ping`: sample ping.
- POST `/api/v1/generate`: body `{ "topic": "<string>" }` -> `{ "result": "<string>", "output_file": "<path|null>" }`.
  - 200: success, with result text and optional path to output file.
  - 4xx/5xx: JSON error payload.

## 8) Configuration
- `.env` (root and backend) used for:
  - GOOGLE_API_KEY, SERPER_API_KEY (domain/agents).
  - APP_NAME, APP_ENV, LOG_LEVEL, PORT, CORS_ORIGINS (backend).
- Local development: copy `backend/.env.example` -> `backend/.env`.

## 9) Security & Compliance
- Do not commit secrets. Rotate keys if exposed.
- CORS defaults to `*` in dev; restrict for production.
- No PII collected. Logs should avoid sensitive data.

## 10) Observability
- Health/readiness endpoints.
- Future: structured logs and request IDs.

## 11) Testing
- Pytest suite for health and ping endpoints.
- Add unit tests for integrations and error handling.

## 12) Performance & Reliability
- Synchronous endpoint calling Crew; long LLM operations may take time.
- Future: background jobs / streaming progress.

## 13) Rollout Plan
- Phase 1: Local runs, iterate on topics and output quality.
- Phase 2: Add simple UI or CLI client.
- Phase 3: Harden for prod: auth, logging, rate limits, CI/CD.

## 14) Open Questions
- Should generation be async with a job ID and polling?
- Do we persist outputs in a database?
- What are allowed model parameters and guardrails?
