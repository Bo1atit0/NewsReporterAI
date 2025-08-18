from fastapi import APIRouter

from .schemas import Ping, TopicRequest, GenerateResponse
from ..integrations.crew_runner import run_generation

api_router = APIRouter(prefix="/api/v1")


@api_router.get("/ping", response_model=Ping)
async def ping() -> Ping:
    return Ping(message="pong")


@api_router.post("/generate", response_model=GenerateResponse)
async def generate(payload: TopicRequest) -> GenerateResponse:
    data = run_generation(payload.topic)
    return GenerateResponse(**data)
