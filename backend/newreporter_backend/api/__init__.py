from fastapi import APIRouter

# Re-export the main API router from routes to avoid duplicate instances
from .routes import api_router  # noqa: F401
