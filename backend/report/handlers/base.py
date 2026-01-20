from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
import pandas as pd

class ReportHandler(ABC):
    def __init__(self, next_handler: Optional["ReportHandler"] = None):
        self.next = next_handler

    def set_next(self, handler: "ReportHandler") -> "ReportHandler":
        self.next = handler
        return handler

    def handle(self, df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
        result = self.process(df, config)
        if self.next:
            return self.next.handle(result, config)
        return result

    @abstractmethod
    def process(self, df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
        pass
