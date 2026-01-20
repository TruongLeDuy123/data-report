from report.handlers.base import ReportHandler
from report.clean import clean_data

class CleanHandler(ReportHandler):
    def process(self, df, config):
        return clean_data(df)
