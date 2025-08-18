#!/usr/bin/env python3
import argparse
import sys
from typing import Any

import httpx


def fetch(client: httpx.Client, path: str) -> tuple[int, Any]:
    try:
        r = client.get(path, timeout=10)
        return r.status_code, r.json() if r.headers.get("content-type", "").startswith("application/json") else r.text
    except Exception as e:
        return 0, {"error": str(e)}


def main():
    parser = argparse.ArgumentParser(description="Demo client for NEWREPORTER backend")
    parser.add_argument("--base-url", default="http://127.0.0.1:8000", help="Base URL of the API")
    parser.add_argument("--generate", action="store_true", help="Trigger content generation via /api/v1/generate")
    parser.add_argument("--topic", default="AI in healthcare", help="Topic to use when generating content")
    parser.add_argument("--self-check", action="store_true", help="Verify imports of domain/services/integrations and basic callables")
    args = parser.parse_args()

    base = args.base_url.rstrip("/")

    with httpx.Client(base_url=base) as client:
        for ep in ["/health", "/ready", "/api/v1/ping"]:
            code, data = fetch(client, ep)
            print(f"GET {base}{ep} -> {code}\n{data}\n")

        if args.generate:
            try:
                r = client.post("/api/v1/generate", json={"topic": args.topic}, timeout=60)
                payload = r.json() if r.headers.get("content-type", "").startswith("application/json") else r.text
                print(f"POST {base}/api/v1/generate topic='{args.topic}' -> {r.status_code}\n{payload}\n")
            except Exception as e:
                print(f"Error calling generate: {e}")

    if args.self_check:
        print("Running self-checks for modules and callables...\n")
        try:
            from newreporter_backend.domain import agents as domain_agents  # noqa: WPS433
            from newreporter_backend.domain import tasks as domain_tasks  # noqa: WPS433
            from newreporter_backend.services import sample_service  # noqa: WPS433
            from newreporter_backend.integrations import crew_runner  # noqa: WPS433

            ok = True
            # Services
            if not hasattr(sample_service, "echo_message"):
                print("[FAIL] services.sample_service.echo_message not found")
                ok = False
            else:
                print("[OK] services.sample_service.echo_message present -> '", sample_service.echo_message("  hi  "), "'", sep="")

            # Domain factories
            if not hasattr(domain_agents, "create_agents"):
                print("[FAIL] domain.agents.create_agents not found")
                ok = False
            else:
                print("[OK] domain.agents.create_agents present")
            if not hasattr(domain_tasks, "create_tasks"):
                print("[FAIL] domain.tasks.create_tasks not found")
                ok = False
            else:
                print("[OK] domain.tasks.create_tasks present")

            # Integrations
            if not hasattr(crew_runner, "run_generation"):
                print("[FAIL] integrations.crew_runner.run_generation not found")
                ok = False
            else:
                print("[OK] integrations.crew_runner.run_generation present")

            print("\nSelf-check result:", "PASS" if ok else "FAIL")
        except Exception as e:  # pragma: no cover - diagnostic path
            print("[ERROR] Self-check exception:", e)

    return 0


if __name__ == "__main__":
    sys.exit(main())
