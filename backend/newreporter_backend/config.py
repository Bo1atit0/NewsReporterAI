from __future__ import annotations
import os
from functools import lru_cache
from typing import List

from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load .env from project root/backends where script is executed
load_dotenv(dotenv_path=os.path.join(os.getcwd(), "backend", ".env"), override=False)
load_dotenv(override=False)  # fallback to current working dir


class Settings(BaseModel):
    app_name: str = Field(default="newreporter-backend", alias="APP_NAME")
    app_env: str = Field(default="development", alias="APP_ENV")
    log_level: str = Field(default="info", alias="LOG_LEVEL")
    port: int = Field(default=8000, alias="PORT")

    cors_origins: List[str] = Field(default_factory=lambda: ["*"])  # alias handled manually

    @classmethod
    def from_env(cls) -> "Settings":
        cors = os.getenv("CORS_ORIGINS", "*")
        origins = [o.strip() for o in cors.split(",") if o.strip()] if cors else ["*"]
        return cls(**{
            "APP_NAME": os.getenv("APP_NAME", "newreporter-backend"),
            "APP_ENV": os.getenv("APP_ENV", "development"),
            "LOG_LEVEL": os.getenv("LOG_LEVEL", "info"),
            "PORT": int(os.getenv("PORT", "8000")),
            "cors_origins": origins,
        })


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings.from_env()
