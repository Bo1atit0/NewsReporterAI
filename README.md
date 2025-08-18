# newsREPORTERai

newsREPORTERai is an AI-driven news generation system leveraging Google Gemini models and custom-built agents for research and writing tasks. The system is designed to identify emerging trends in various topics, especially technology, and generate insightful articles.

## Project Overview

This project uses CrewAI to orchestrate research and writing agents that work collaboratively to identify trends and write engaging, easy-to-understand blog posts about these trends. The agents utilize Google Gemini models (Gemini 1.5 Flash) for LLM capabilities and the Serper API for internet search functionality. 

### Features
- **Research Agent**: A Senior Researcher tasked with uncovering groundbreaking technologies and trends.
- **Writing Agent**: A Writer specialized in creating compelling tech stories, focusing on simplifying complex topics.
- **Tools**: Internet search tool powered by Serper API.
- **Tasks**: Includes researching and writing tasks that produce trend reports and blog posts on a given topic.

## Installation

### Prerequisites
- Python 3.x
- `pip` for package installation
- Google API Key and Serper API Key (set in `.env` file)

### Clone the Repository
```bash
git clone https://github.com/austinLorenzMccoy/newREPORTERai.git
cd newREPORTERai
```

### Setup Environment Variables

Create a `.env` file in the project root with the following keys:
```
GOOGLE_API_KEY=<Your_Google_API_Key>
SERPER_API_KEY=<Your_Serper_API_Key>
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Required Python Packages
- `crewai`
- `langchain_google_genai`
- `python-dotenv`

### Usage

You can start the AI-driven research and writing tasks by calling the `kickoff` method on the crew object.

Example usage:
```python
from crew import crew

# Start task execution
result = crew.kickoff(inputs={'topic': 'AI in healthcare'})
print(result)
```

This will trigger the research task for discovering the next big trend in the given topic and the writing task to create an engaging blog post.

## Project Structure

- **`agents.py`**: Defines the `news_researcher` and `news_writer` agents.
- **`tools.py`**: Initializes the internet search tool (Serper API).
- **`tasks.py`**: Contains the task definitions for research and writing.
- **`crew.py`**: Orchestrates the agents and tasks using CrewAI.
- **`.env`**: Stores API keys and other environment variables.
- **`.gitignore`**: Ignores environment files and other unnecessary items for version control.
- **`new-blog-post.md`**: Contains the output from the writing task, in markdown format.

## Contributing

Feel free to fork this repository, create a new branch, and submit a pull request. All contributions are welcome!


---

## Backend (FastAPI)

The project now includes a modular FastAPI backend located in `backend/`. It provides health/readiness endpoints and a versioned API namespace for future features.

### Structure
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

### Setup (virtual environment)
Run these from the repository root:
```bash
python3 -m venv backend_env
source backend_env/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

### Environment variables
Configure local environment variables by copying the example file:
```bash
cp backend/.env.example backend/.env
```
Then edit `backend/.env` as needed. Example keys:
- `APP_NAME`, `APP_ENV`, `LOG_LEVEL`, `PORT`, `CORS_ORIGINS`

The FastAPI app loads configuration from `.env` via `python-dotenv` in `newreporter_backend/config.py`.

### Running the API
With the virtual environment active:
```bash
uvicorn newreporter_backend.main:app --reload --port 8000
```
Health check:
```bash
curl http://127.0.0.1:8000/health
```

### Endpoints
- `GET /health` – liveness
- `GET /ready` – readiness
- `GET /api/v1/ping` – sample endpoint (returns `{ "message": "pong" }`)

### Tests
Run tests with pytest:
```bash
pytest backend/tests -q
```

### Demo client
Use the demo script to call endpoints:
```bash
python backend/api_demo.py --base-url http://127.0.0.1:8000
```

### Packaging
Install the backend in editable mode if desired:
```bash
pip install -e backend
```

### Security note
- Do not commit real API keys or secrets. Use `.env` locally and secret managers in production.
- If sensitive keys were accidentally added to git history, rotate them immediately and purge history if necessary.

For more details see `backend/README.md`.
