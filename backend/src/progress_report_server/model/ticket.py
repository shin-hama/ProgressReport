from pydantic import BaseModel


class Ticket(BaseModel):
    name: str
    url: str
    number: int
    service_name: str
