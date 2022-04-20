from datetime import datetime

from pydantic import BaseModel


class Ticket(BaseModel):
    name: str
    url: str
    number: int
    service_name: str
    created_at: datetime
    updated_at: datetime
