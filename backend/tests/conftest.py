import pytest
from fastapi.testclient import TestClient
from newreporter_backend.main import create_app


@pytest.fixture(scope="session")
def client():
    app = create_app()
    with TestClient(app) as c:
        yield c
