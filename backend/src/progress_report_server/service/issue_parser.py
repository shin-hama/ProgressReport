from abc import ABCMeta, abstractmethod

from progress_report_server.model.ticket import Ticket


class AbstractIssueParser(metaclass=ABCMeta):
    @abstractmethod
    async def get_tickets(self) -> list[Ticket]:
        raise NotImplementedError
