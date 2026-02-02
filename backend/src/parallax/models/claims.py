"""Claim and citation models for research results."""

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field, HttpUrl


class ConfidenceLevel(str, Enum):
    """Qualitative confidence assessment for validated claims."""

    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    CONFLICTED = "conflicted"


class ClaimType(str, Enum):
    """Classification of claim content type."""

    FACTUAL = "factual"
    OPINION = "opinion"
    PREDICTION = "prediction"


class Citation(BaseModel):
    """Source reference for a claim."""

    url: HttpUrl
    title: str | None = None
    date: datetime | None = None


class Claim(BaseModel):
    """Raw claim extracted from a single research engine."""

    statement: str = Field(min_length=10)
    source_engine: str
    citations: list[Citation] = Field(default_factory=list)
    confidence: float = Field(ge=0.0, le=1.0)
    claim_type: ClaimType = ClaimType.FACTUAL


class ValidatedClaim(BaseModel):
    """Claim that has been cross-validated across multiple engines."""

    statement: str
    confidence_score: int = Field(ge=0)
    confidence_level: ConfidenceLevel
    sources_agreeing: list[str] = Field(default_factory=list)
    sources_disagreeing: list[str] = Field(default_factory=list)
    citations: list[Citation] = Field(default_factory=list)


__all__ = [
    "ConfidenceLevel",
    "ClaimType",
    "Citation",
    "Claim",
    "ValidatedClaim",
]
