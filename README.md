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

