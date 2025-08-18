from pydantic import BaseModel


class Ping(BaseModel):
    message: str


class TopicRequest(BaseModel):
    topic: str


class GenerateResponse(BaseModel):
    result: str
    output_file: str | None = None
