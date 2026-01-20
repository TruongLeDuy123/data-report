import pandas as pd
from typing import Dict, Any
from report.handlers.clean_handler import CleanHandler
from report.handlers.time_bucket_handler import TimeBucketHandler
from report.handlers.metrics_handler import MetricsHandler
from report.handlers.rolling_handler import RollingHandler
from report.handlers.filter_handler import FilterColumnsHandler
from report.handlers.groupby_handler import GroupByHandler
from report.handlers.finalize_handler import FinalizeHandler

def build_report(df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
    # Build chain
    chain = CleanHandler()
    chain \
        .set_next(TimeBucketHandler()) \
        .set_next(MetricsHandler()) \
        .set_next(RollingHandler()) \
        .set_next(FilterColumnsHandler()) \
        .set_next(GroupByHandler()) \
        .set_next(FinalizeHandler())

    # Run chain
    result = chain.handle(df, config)
    return result
