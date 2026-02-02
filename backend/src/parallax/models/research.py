"""Research request and brief models."""

from datetime import datetime, timezone
from enum import Enum
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field


class ResearchMode(str, Enum):
    """Research depth mode controlling engine selection and processing."""

    QUICK = "quick"
    STANDARD = "standard"
    DEEP = "deep"


class ResearchStatus(str, Enum):
    """Status of a research job through its lifecycle."""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETE = "complete"
    PARTIAL = "partial"
    FAILED = "failed"


class ResearchRequest(BaseModel):
    """Incoming research query from the user."""

    query: str = Field(min_length=3, max_length=2000)
    mode: ResearchMode = ResearchMode.STANDARD


class ResearchBrief(BaseModel):
    """Enriched research context after query analysis."""

    research_id: str = Field(default_factory=lambda: str(uuid4()))
    original_query: str
    sub_questions: list[str] = Field(default_factory=list)
    domain: str = ""
    depth: str = ""
    recency_weight: Literal["high", "medium", "low"] = "medium"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


__all__ = [
    "ResearchMode",
    "ResearchStatus",
    "ResearchRequest",
    "ResearchBrief",
]
