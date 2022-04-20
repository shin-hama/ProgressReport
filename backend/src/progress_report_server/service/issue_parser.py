from abc import ABCMeta, abstractmethod
from datetime import date
from typing import Optional

from progress_report_server.model.ticket import Ticket


class AbstractIssueParser(metaclass=ABCMeta):
    @abstractmethod
    async def get_tickets(
        self, start: Optional[date], end: Optional[date]
    ) -> list[Ticket]:
        raise NotImplementedError
