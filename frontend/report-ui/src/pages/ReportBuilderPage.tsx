import { FileUpload } from "../components/FileUpload"
import { MetricsSelector } from "../components/MetricSelector"
import { GroupBySelector } from "../components/GroupBySelector"
import { AggregationSelector } from "../components/AggregateSelector"
import { TimeBucketSelector } from "../components/TimeBucketSelector"
import { RollingConfig } from "../components/RollingConfig"
import { PreviewTable } from "../components/PreviewTable"
import { previewReport, exportReport } from "../api/report"
import type { ReportConfig } from "../types/report"
import { useState } from "react"

export default function ReportBuilderPage() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<any>(null)

    const [config, setConfig] = useState<ReportConfig>({
        group_by: [],
        metrics: [],
        aggregation: {} as ReportConfig["aggregation"],
        time_bucket: "",
        rolling: { window: 3, metrics: [] },
        preview: true
    })

    async function onPreview() {
        if (!file) return
        const res = await previewReport(file, config)
        setPreview(res)
    }

    async function onExport() {
        if (!file) return
        const blob = await exportReport(file, { ...config, preview: false })
        const url = URL.createObjectURL(blob)
        window.open(url)
    }

    return (
        <>
            <FileUpload onSelect={setFile} />

            <GroupBySelector
                options={["date", "campaign_id", "platform", "category"]}
                value={config.group_by}
                onChange={v => setConfig(c => ({ ...c, group_by: v }))}
            />

            <MetricsSelector
                metrics={["date", "campaign_id", "campaign_name", "platform", "spend", "clicks", "impressions", "conversions", "ctr", "cpc", "category"]}
                value={config.metrics}
                onChange={v => setConfig(c => ({ ...c, metrics: v }))}
            />

            <AggregationSelector
                options={["spend", "clicks", "impressions"]}
                value={config.aggregation}
                onChange={v => setConfig(c => ({ ...c, aggregation: v }))}
            />

            <TimeBucketSelector
                value={config.time_bucket}
                onChange={v => setConfig(c => ({ ...c, time_bucket: v }))}
            />

            <RollingConfig
                value={config.rolling}
                options={["spend", "clicks"]}
                onChange={v => setConfig(c => ({ ...c, rolling: v }))}
            />

            <button onClick={onPreview}>Preview</button>
            <button onClick={onExport}>Export</button>

            {preview && <PreviewTable rows={preview.rows} groupBy={config.group_by}/>}
        </>
    )
}
