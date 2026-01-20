from report.handlers.base import ReportHandler
from report.groupby_engine import group_report

class GroupByHandler(ReportHandler):
    def process(self, df, config):
        return group_report(
            df=df,
            group_by=config.get("group_by", []),
            aggregations=config.get("_valid_aggs", {})
        )
