import asyncio
from typing import Any, Optional
from datetime import date
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from progress_report_server.app.models.tickets import Tickets
from progress_report_server.infrastructure import get_clients
from progress_report_server.service.issue_parser import AbstractIssueParser


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root() -> Any:
    return {"message": "OK"}


@app.get("/tickets", response_model=Tickets)
async def get_tickets(
    start: Optional[date] = None,
    end: Optional[date] = None,
    clients: list[AbstractIssueParser] = Depends(get_clients),
) -> Any:
    tickets = []
    for result in await asyncio.gather(*[c.get_tickets(start, end) for c in clients]):
        tickets.extend(result)

    return Tickets(tickets=tickets)
