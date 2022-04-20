from pydantic import BaseModel

from progress_report_server.model.ticket import Ticket


class Tickets(BaseModel):
    tickets: list[Ticket]
