from __future__ import annotations
import os
import sys
from typing import Dict, Any

from dotenv import load_dotenv

# Load env from both backend/.env and project root .env
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
load_dotenv(os.path.join(BACKEND_DIR, ".env"), override=False)
load_dotenv(os.path.join(BACKEND_DIR, ".env.root"), override=False)  # optional migrated .env
load_dotenv(os.path.join(ROOT_DIR, ".env"), override=False)

def run_generation(topic: str) -> Dict[str, Any]:
    """Run the CrewAI workflow using project-defined agents and tasks.

    Returns a dict containing the crew result and the output file if configured.
    """
    # Lazy imports to keep tests light and avoid import-time dependency issues
    from crewai import Crew, Process  # noqa: WPS433
    from newreporter_backend.domain.agents import create_agents  # noqa: WPS433
    from newreporter_backend.domain.tasks import create_tasks  # noqa: WPS433

    news_researcher, news_writer = create_agents()
    research_task, write_task = create_tasks(news_researcher, news_writer)

    crew = Crew(
        agents=[news_researcher, news_writer],
        tasks=[research_task, write_task],
        process=Process.sequential,
    )

    result = crew.kickoff(inputs={"topic": topic})

    output_file = None
    try:
        # write_task may declare output_file
        output_file = getattr(write_task, "output_file", None)
        if output_file and not os.path.isabs(output_file):
            output_file = os.path.join(ROOT_DIR, output_file)
    except Exception:
        pass

    return {
        "result": str(result),
        "output_file": output_file,
    }
