"""Application configuration loaded from environment variables."""

from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    anthropic_api_key: str | None = None
    perplexity_api_key: str | None = None
    kimi_api_key: str | None = None
    openai_api_key: str | None = None

    debug: bool = False
    environment: Literal["development", "production"] = "development"
    api_host: str = "0.0.0.0"
    api_port: int = 8000


@lru_cache
def get_settings() -> Settings:
    """Get cached application settings singleton."""
    return Settings()
