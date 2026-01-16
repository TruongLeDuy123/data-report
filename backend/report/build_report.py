import pandas as pd
from typing import Dict, Any
import numpy as np
from report.clean import clean_data
from report.metrics import add_metrics
from report.groupby_engine import group_report
from report.time_bucket import apply_time_bucket
from report.rolling_engine import apply_rolling

def validate_config(config: Dict[str, Any]) -> None:
    if not isinstance(config.get("group_by", []), list):
        raise ValueError("group_by must be a list")

    if "aggregation" in config and not isinstance(config["aggregation"], dict):
        raise ValueError("aggregation must be a dict")



def build_report(
    df: pd.DataFrame,
    config: Dict[str, Any]
) -> pd.DataFrame:
    """
    Build report from raw dataframe & config
    """

    validate_config(config)

    # 1. Clean
    df = clean_data(df)

    # 2. Time bucket
    df = apply_time_bucket(df, config.get("time_bucket"))

    # 3. Add metrics (CTR, CPC)
    df = add_metrics(df)

    # 4. Rolling (Before group by)
    df = apply_rolling(df, rolling_config=config.get("rolling"), group_keys=["campaign_id"])

    # 5. Filter metrics (UI chọn gì thì lấy đó)
    metrics = config.get("metrics", [])
    aggregations = config.get("aggregation", {})
    rolling_metrics = []

    if config.get("rolling"):
        w = config["rolling"]["window"]
        unit = config["rolling"].get("unit", "D").lower()
        for m in config["rolling"]["metrics"]:
            rolling_metrics.append(f"{m}_rolling_{w}{unit}")


    keep_cols = set(config.get("group_by", []))
    keep_cols |= set(metrics)
    keep_cols |= set(rolling_metrics)
    VALID_AGG_FUNCS = {"sum", "mean", "min", "max"}

    valid_aggs = {
        col: agg
        for col, agg in aggregations.items()
        if col in df.columns
        and isinstance(agg, str)
        and agg in VALID_AGG_FUNCS
    }


    keep_cols |= set(valid_aggs.keys())

    df = df[list(keep_cols)]

    # 6. Group by
    result = group_report(
        df=df,
        group_by=config.get("group_by", []),
        aggregations=valid_aggs
    )
    
    result = result.where(pd.notnull(result), None)
    if "date" in result.columns:
        result["date"] = result["date"].dt.strftime("%Y-%m-%d")

    return result
