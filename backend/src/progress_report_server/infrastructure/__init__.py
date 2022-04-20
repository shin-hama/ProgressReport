from progress_report_server.infrastructure.azure_devops import AzureClient
from progress_report_server.infrastructure.redmine import RedmineParser
from progress_report_server.service.issue_parser import AbstractIssueParser


def get_clients() -> list[AbstractIssueParser]:
    return [AzureClient(), RedmineParser()]
