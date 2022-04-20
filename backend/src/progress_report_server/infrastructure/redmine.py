from datetime import date, datetime
import os
from typing import Optional, Union

from redminelib import Redmine, resources

from progress_report_server.core.config import env_config
from progress_report_server.model.ticket import Ticket
from progress_report_server.service.issue_parser import AbstractIssueParser


DateLike = Optional[Union[date, str]]


def remove_proxy() -> None:
    """
    社内サーバーにアクセスするときは Proxy 設定を削除する
    """
    os.environ.update({"http_proxy": ""})
    os.environ.update({"https_proxy": ""})


def setup_proxy() -> None:
    if env_config.proxy is not None:
        os.environ.update({"http_proxy": env_config.proxy})
        os.environ.update({"https_proxy": env_config.proxy})


class RedmineParser(AbstractIssueParser):
    def __init__(self) -> None:
        self.redmine = Redmine(
            url=env_config.redmine_url,
            key=env_config.redmine_api_key,
        )

    async def get_tickets(
        self, start: Optional[date] = None, end: Optional[date] = None
    ) -> list[Ticket]:
        """Get the issues that were updated in the specified period for current session user.

        Parameters
        ----------
        start: str, date or None default is None
            start date to filter. If this is None, you can get all issues.
        end: str, date or None default is None
            end date to filter. If this is None, you can get up to today.

        Return
        ------
        issues:  Iterator of redminelib.resources.Issue
            The iterator of issues between start and end.
        """
        filter = {}

        updated_on = self._build_date_range(start, end)
        # updated_on will be not set when timestamp condition is empty
        if updated_on:
            filter["updated_on"] = updated_on

        remove_proxy()
        u = self.redmine.user.get("current")

        issues: list[resources.Issue] = self.redmine.issue.filter(
            assigned_to_id=u.id, **filter
        )
        tickets = [self._build_ticket(issue) for issue in issues]
        setup_proxy()

        return tickets

    def _build_date_range(
        self, start: DateLike = None, end: DateLike = None
    ) -> Optional[str]:
        condition = None
        if start is not None:
            if end is None:
                end = datetime.today().date()
            condition = f"><{start}|{end}"

        return condition

    def _build_ticket(self, issue: resources.Issue) -> Ticket:
        return Ticket(
            name=issue.subject,
            url=issue.url,
            number=issue.id,
            service_name="Redmine",
            created_at=issue.created_on,
            updated_at=issue.updated_on,
        )
