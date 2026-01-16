import pandas as pd
from typing import List, Dict

def group_report(
    df: pd.DataFrame,
    group_by: List[str],
    aggregations: Dict[str, str]
) -> pd.DataFrame:
    """
    group_by: ["date", "platform"]
    aggregations: {"spend": "sum", "impressions": "sum", "clicks": "sum", "ctr": "mean"}
    """

    # if no group anything → total report
    if not group_by:
        return df
    
    if not aggregations:
        return df.sort_values(group_by)

    grouped_df = (
        df
        .groupby(group_by, dropna=False)
        .agg(aggregations)
        .reset_index()
    )

    return grouped_df
