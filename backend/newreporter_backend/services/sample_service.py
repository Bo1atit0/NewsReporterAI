from __future__ import annotations


def echo_message(msg: str) -> str:
    """Simple sample business logic to demonstrate service layer.
    In a real app, this could call external systems or databases.
    """
    return msg.strip()
