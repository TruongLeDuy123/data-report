import pandas as pd

def apply_time_bucket(
    df: pd.DataFrame,
    bucket: str | None
) -> pd.DataFrame:
    """
    bucket: daily | weekly | monthly | None
    """

    if not bucket or bucket == "daily":
        return df

    if bucket == "weekly":
        df["date"] = df["date"].dt.to_period("W").dt.start_time
        return df

    if bucket == "monthly":
        df["date"] = df["date"].dt.to_period("M").dt.start_time
        return df

    raise ValueError(f"Unsupported time bucket: {bucket}")
