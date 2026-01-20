from report.handlers.base import ReportHandler
from report.rolling_engine import apply_rolling

class RollingHandler(ReportHandler):
    def process(self, df, config):
        return apply_rolling(
            df,
            rolling_config=config.get("rolling"),
            group_keys=["campaign_id"]
        )
