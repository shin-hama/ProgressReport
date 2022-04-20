from azure.devops.connection import Connection
from azure.devops.v6_0.work_item_tracking import (
    WorkItemTrackingClient,
    Wiql,
    WorkItemQueryResult,
)
from azure.devops.v6_0.work_item_tracking.models import WorkItem

from msrest.authentication import BasicAuthentication

from progress_report_server.core.config import env_config
from progress_report_server.model.ticket import Ticket
from progress_report_server.service.issue_parser import AbstractIssueParser


class AzureClient(AbstractIssueParser):
    def __init__(self) -> None:
        credentials = BasicAuthentication("", env_config.azure_pat)
        connection = Connection(
            base_url=env_config.azure_organization, creds=credentials
        )
        client = connection.clients_v6_0.get_work_item_tracking_client()

        self.client: WorkItemTrackingClient = client

    async def get_tickets(self) -> list[Ticket]:
        result = self._get_all_issues()
        return [
            self._build_ticket(self.client.get_work_item(wi.id))
            for wi in result.work_items
        ]

    def _get_all_issues(self) -> WorkItemQueryResult:
        # Get all work items where a type is issue
        query = "Select * From WorkItems Where [System.AssignedTo] = 'shamada'"
        wiql = Wiql(query)
        return self.client.query_by_wiql(wiql)

    def _build_ticket(self, work_item: WorkItem) -> Ticket:
        return Ticket(
            name=work_item.fields["System.Title"],
            url=work_item.url,
            number=work_item.id,
            service_name="Azure DevOps",
        )
