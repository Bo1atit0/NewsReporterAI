def test_integration_runner_importable():
    # Import to ensure module-level code does not raise and function exists
    from newreporter_backend.integrations.crew_runner import run_generation  # noqa: WPS433

    assert callable(run_generation)
