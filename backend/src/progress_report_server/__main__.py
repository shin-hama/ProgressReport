import uvicorn


def main() -> None:
    uvicorn.run("progress_report_server.app.main:app", reload=True)


if __name__ == "__main__":
    main()
