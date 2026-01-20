from report.handlers.base import ReportHandler
from report.time_bucket import apply_time_bucket

class TimeBucketHandler(ReportHandler):
    def process(self, df, config):
        return apply_time_bucket(df, config.get("time_bucket"))
