"""Research API routes."""

from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter

from parallax.models import (
    ConfidenceLevel,
    ResearchOutput,
    ResearchRequest,
    ResearchStatus,
    ValidatedClaim,
)

router = APIRouter(prefix="/research", tags=["research"])


@router.post("")
async def create_research(request: ResearchRequest) -> dict:
    """Submit a new research query for processing."""
    research_id = str(uuid4())
    return {"research_id": research_id, "status": "pending"}


@router.get("/{research_id}")
async def get_research(research_id: str) -> ResearchOutput:
    """Get research results by ID."""
    return ResearchOutput(
        research_id=research_id,
        query="Mock query",
        status=ResearchStatus.COMPLETE,
        validated_claims=[
            ValidatedClaim(
                statement="This is a mock validated claim for demonstration purposes.",
                confidence_score=85,
                confidence_level=ConfidenceLevel.HIGH,
                sources_agreeing=["perplexity", "kimi"],
                sources_disagreeing=[],
                citations=[],
            )
        ],
        conflicts=[],
        summary="Mock summary of research findings.",
        engines_used=["perplexity", "kimi"],
        engines_failed=[],
        created_at=datetime.now(timezone.utc),
        completed_at=datetime.now(timezone.utc),
    )
