from typing import Tuple
from dotenv import load_dotenv
import os

load_dotenv()


def create_agents() -> Tuple["Agent", "Agent"]:
    """Factory to create and return (news_researcher, news_writer).

    Heavy deps (crewai, langchain-google-genai) are imported lazily here
    to keep module import side-effects minimal for testing.
    """
    from crewai import Agent  # noqa: WPS433
    from langchain_google_genai import ChatGoogleGenerativeAI  # noqa: WPS433
    from .tools import tool  # noqa: WPS433

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        verbose=True,
        temperature=0.5,
        google_api_key=os.getenv("GOOGLE_API_KEY"),
    )

    news_researcher = Agent(
        role="Senior Researcher",
        goal='Uncover ground breaking technologies in {topic}',
        verbose=True,
        memory=False,
        backstory=(
            "Driven by curiosity, you're at the forefront of"
            "innovation, eager to explore and share knowledge that could change"
            "the world."
        ),
        tools=[tool],
        llm=llm,
        allow_delegation=True,
    )

    news_writer = Agent(
        role='Writer',
        goal='Narrate compelling tech stories about {topic}',
        verbose=True,
        memory=False,
        backstory=(
            "With a flair for simplifying complex topics, you craft"
            "engaging narratives that captivate and educate, bringing new"
            "discoveries to light in an accessible manner."
        ),
        tools=[tool],
        llm=llm,
        allow_delegation=False,
    )

    return news_researcher, news_writer
