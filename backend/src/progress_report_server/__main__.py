import uvicorn

from progress_report_server.core.config import env_config


def main() -> None:
    uvicorn.run(
        "progress_report_server.app.main:app",
        host="0.0.0.0",
        port=env_config.app_port,
        reload=True,
    )


if __name__ == "__main__":
    main()
