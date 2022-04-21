from typing import Optional

from pydantic import BaseSettings


DOTENV_FILE = ".env"


class EnvConfig(BaseSettings):
    redmine_url: str
    redmine_api_key: str

    azure_pat: str
    azure_organization: str
    proxy: Optional[str]

    app_port: int

    class Config:
        env_file = DOTENV_FILE
        env_file_encoding = "utf-8"


env_config = EnvConfig()
