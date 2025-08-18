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

    return 0


if __name__ == "__main__":
    sys.exit(main())
