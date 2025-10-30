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
    try:
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
    except Exception as e:
        # Fallback: generate real content using Gemini directly to ensure a meaningful response
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI  # noqa: WPS433

            llm = ChatGoogleGenerativeAI(
                model=os.getenv("MODEL"),
                verbose=True,
                temperature=0.6,
                google_api_key=os.getenv("GOOGLE_API_KEY"),
            )
            prompt = (
                "You are a senior tech analyst and writer.\n"
                f"Research the latest on the topic: '{topic}'.\n"
                "1) Summarize the key trends, opportunities, and risks in ~3 paragraphs.\n"
                "2) Then write a clear, engaging 4-paragraph markdown article on the topic.\n"
                "Keep it factual, concise, and accessible."
            )
            result = llm.invoke(prompt)
            content = getattr(result, "content", str(result))
            return {
                "result": content,
                "output_file": None,
            }
        except Exception as inner:
            # If even direct LLM fails, return a minimal diagnostic string
            return {
                "result": f"Generation unavailable ({e.__class__.__name__}/{inner.__class__.__name__}).",
                "output_file": None,
            }
