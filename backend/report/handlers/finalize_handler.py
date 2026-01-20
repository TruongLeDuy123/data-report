from report.handlers.base import ReportHandler
import pandas as pd

class FinalizeHandler(ReportHandler):
    def process(self, df, config):
        df = df.where(pd.notnull(df), None)
        if "date" in df.columns:
            df["date"] = df["date"].dt.strftime("%Y-%m-%d")
        return df
