import pandas as pd
import numpy as np

def add_metrics(df: pd.DataFrame) -> pd.DataFrame:
    # CTR: Click-Through Rate
    df["ctr"] = df["clicks"] / df["impressions"]
    # CPC: Cost Per Click
    df["cpc"] = df["spend"] / df["clicks"]
    return df