#!/usr/bin/env python3
import json
import sys


def write(msg: dict) -> None:
    sys.stdout.write(json.dumps(msg, separators=(",", ":")) + "\n")
    sys.stdout.flush()


def main() -> None:
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError:
            continue
        req_id = req.get("id")
        method = req.get("method")
        params = req.get("params") or {}

        if method == "initialize" and req_id is not None:
            write({"jsonrpc": "2.0", "id": req_id, "result": {"protocolVersion": 1}})
            continue
        if method == "authenticate" and req_id is not None:
            write({"jsonrpc": "2.0", "id": req_id, "result": {"authenticated": True}})
            continue
        if method == "session/new" and req_id is not None:
            write({"jsonrpc": "2.0", "id": req_id, "result": {"sessionId": "fake-acp-session-1"}})
            continue
        if method == "session/prompt" and req_id is not None:
            write(
                {
                    "jsonrpc": "2.0",
                    "method": "session/update",
                    "params": {
                        "update": {
                            "sessionUpdate": "agent_message_chunk",
                            "content": {"text": "hello from fake acp"},
                        }
                    },
                }
            )
            write(
                {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"stopReason": "end_turn"},
                }
            )
            continue
        if method == "session/cancel" and req_id is not None:
            write({"jsonrpc": "2.0", "id": req_id, "result": {}})
            continue


if __name__ == "__main__":
    main()
