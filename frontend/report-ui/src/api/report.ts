import type { ReportConfig, PreviewResponse } from "../types/report"
const BASE_URL = "http://localhost:8000"

export async function previewReport(
    file: File,
    config: ReportConfig
): Promise<PreviewResponse> {
    const form = new FormData()
    form.append("file", file)
    form.append("config", JSON.stringify(config))
    const res = await fetch(`${BASE_URL}/reports/preview`, {
        method: "POST",
        body: form
    })

    if (!res.ok) throw new Error("Preview failed")

    return res.json()
}

export async function exportReport(
    file: File,
    config: ReportConfig
) {
    const form = new FormData()
    form.append("file", file)
    form.append("config", JSON.stringify(config))

    const res = await fetch(`${BASE_URL}/reports/export`, {
        method: "POST",
        body: form
    })

    if (!res.ok) throw new Error("Export failed")

    return res.blob()
}
