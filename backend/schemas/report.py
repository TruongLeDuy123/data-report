# from pydantic import BaseModel
# from typing import List, Dict, Optional

# class RollingConfig(BaseModel):
#     type: str  # "cumulative" | "window"
#     window: Optional[int] = None
#     metrics: List[str]

# class ReportConfig(BaseModel):
#     group_by: List[str]
#     metrics: List[str]
#     aggregation: Dict[str, str]
#     time_bucket: Optional[str] = None  # daily | weekly | monthly
#     rolling: Optional[RollingConfig] = None
