import pandas as pd
from typing import Dict, Any

def apply_rolling(
    df: pd.DataFrame,
    rolling_config: Dict[str, Any] | None,
    group_keys: list[str],
    date_col: str = "date"
) -> pd.DataFrame:

    if not rolling_config:
        return df

    window = rolling_config.get("window")
    metrics = rolling_config.get("metrics", [])

    if not window or not metrics:
        return df

    df = df.copy()
    df[date_col] = pd.to_datetime(df[date_col])

    # Aggregate per day first
    group_cols = [*group_keys, date_col]
    df = (
        df
        .groupby(group_cols, as_index=False)
        .sum(numeric_only=True)
    )
    grouped = df.groupby(group_keys)
    for m in metrics:
        rolled = (
            grouped
            .rolling(f"{window}D", on=date_col)[m]
            .sum()
            .reset_index(level=group_keys, drop=True)
        )

        df[f"{m}_rolling_{window}d"] = rolled.values

    return df