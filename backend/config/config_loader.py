import json

def load_config(name: str):
    path = f"config/{name}"
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)