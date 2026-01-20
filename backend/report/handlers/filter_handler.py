from report.handlers.base import ReportHandler

class FilterColumnsHandler(ReportHandler):
    VALID_AGG_FUNCS = {"sum", "mean", "min", "max"}

    def process(self, df, config):
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

        valid_aggs = {
            col: agg
            for col, agg in aggregations.items()
            if col in df.columns
            and isinstance(agg, str)
            and agg in self.VALID_AGG_FUNCS
        }

        keep_cols |= set(valid_aggs.keys())

        # Lưu lại valid_aggs để GroupByHandler dùng
        config["_valid_aggs"] = valid_aggs

        if not keep_cols:
            return df

        return df[list(keep_cols)]
