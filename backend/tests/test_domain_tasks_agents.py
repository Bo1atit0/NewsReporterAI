import types


def test_domain_agents_and_tasks_importable():
    # Import here to ensure module-level code does not error
    from newreporter_backend.domain import agents, tasks  # noqa: WPS433

    # Factories should be present (lazy creation to avoid heavy deps during import)
    assert hasattr(agents, "create_agents")
    assert hasattr(tasks, "create_tasks")

    # Do not instantiate here; just verify module and callables exist
    assert callable(agents.create_agents)
    assert callable(tasks.create_tasks)

    # Types sanity
    assert isinstance(agents, types.ModuleType)
    assert isinstance(tasks, types.ModuleType)
