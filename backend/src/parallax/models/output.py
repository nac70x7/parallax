"""Output models for research results."""

from datetime import datetime

from pydantic import BaseModel, Field

from parallax.models.claims import Claim, ValidatedClaim
from parallax.models.research import ResearchStatus


class Conflict(BaseModel):
    """Disagreement between engines on a topic."""

    topic: str
    positions: dict[str, str]  # {engine_name: their_position}
    resolution_hint: str | None = None


class EngineResult(BaseModel):
    """Result from a single research engine."""

    engine_name: str
    success: bool
    claims: list[Claim] = Field(default_factory=list)
    raw_response: str | None = None
    error: str | None = None
    duration_ms: int = 0


class ResearchOutput(BaseModel):
    """Final synthesized research output."""

    research_id: str
    query: str
    status: ResearchStatus
    validated_claims: list[ValidatedClaim] = Field(default_factory=list)
    conflicts: list[Conflict] = Field(default_factory=list)
    summary: str | None = None
    engines_used: list[str] = Field(default_factory=list)
    engines_failed: list[str] = Field(default_factory=list)
    created_at: datetime
    completed_at: datetime | None = None


__all__ = [
    "Conflict",
    "EngineResult",
    "ResearchOutput",
]
