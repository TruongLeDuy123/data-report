from fastapi import APIRouter, UploadFile, File, Body
from typing import Dict, Any
import pandas as pd
import io, json
from fastapi.responses import StreamingResponse

from report.build_report import build_report

router = APIRouter(prefix="/report", tags=["Report"])

@router.post("/preview")
async def preview_report(
    config: str = Body(...),
    file: UploadFile = File(...)
):
    config_dict = json.loads(config)

    contents = await file.read()

    df = pd.read_csv(io.BytesIO(contents))

    result = build_report(df, config_dict)

    return {
        "columns": list(result.columns),
        "rows": result.head(20).to_dict(orient="records"),
        "total_rows": len(result)
    }


@router.post("/export")
async def export_report(
    config: str = Body(...),
    file: UploadFile = File(...)
):
    contents = await file.read()

    df = pd.read_csv(io.BytesIO(contents))
    config_dict = json.loads(config)

    report_df = build_report(df, config_dict)

    output = io.StringIO()
    report_df.to_csv(output, index=False)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=report.csv"}
    )