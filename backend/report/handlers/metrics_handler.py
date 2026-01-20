from report.handlers.base import ReportHandler
from report.metrics import add_metrics

class MetricsHandler(ReportHandler):
    def process(self, df, config):
        return add_metrics(df)
