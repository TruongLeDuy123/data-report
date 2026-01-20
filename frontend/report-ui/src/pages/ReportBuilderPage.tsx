import { useState } from "react"
import { FileUpload } from "../components/FileUpload"
import { AggregationSelector } from "../components/AggregateSelector"
import { TimeBucketSelector } from "../components/TimeBucketSelector"
import { RollingConfig } from "../components/RollingConfig"
import { PreviewTable } from "../components/PreviewTable"
import { previewReport, exportReport } from "../api/report"
import type { ReportConfig, PreviewResponse, SchemaColumn } from "../types/report"
import { DynamicFieldList } from "../components/DynamicFieldList"

export default function ReportBuilderPage() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<PreviewResponse | null>(null)

    const [resultSchema, setResultSchema] = useState<SchemaColumn[]>([])

    const [config, setConfig] = useState<ReportConfig>({
        group_by: [],
        metrics: [],
        aggregation: {},
        time_bucket: "",
        rolling: { window: 3, metrics: [] },
        preview: true
    })

    const baseMetrics = ["spend", "clicks"]
    const allResultColumns = resultSchema.map(c => c.name)

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

    async function onSelectFile(f: File) {
        setFile(f)
        setPreview(null)

        const emptyConfig: ReportConfig = {
            group_by: [],
            metrics: [],
            aggregation: {},
            time_bucket: "",
            rolling: { window: 3, metrics: [] },
            preview: true
        }

        setConfig(emptyConfig)

        const res = await previewReport(f, emptyConfig)

        if (res.result_schema) {
            setResultSchema(res.result_schema)
        }
    }

    return (
        <div className="mx-auto p-6 space-y-6 bg-gray-300">
            <h1 className="text-2xl font-semibold">Report Builder</h1>

            <FileUpload onSelect={onSelectFile} />

            <DynamicFieldList
                title="Group By"
                options={allResultColumns}
                value={config.group_by}
                onChange={v => setConfig(c => ({ ...c, group_by: v }))}
            />

            <DynamicFieldList
                title="Columns"
                options={allResultColumns}
                value={config.metrics}
                onChange={v => setConfig(c => ({ ...c, metrics: v }))}
            />

            <AggregationSelector
                options={config.metrics}
                value={config.aggregation}
                onChange={v => setConfig(c => ({ ...c, aggregation: v }))}
            />

            <TimeBucketSelector
                value={config.time_bucket}
                onChange={v => setConfig(c => ({ ...c, time_bucket: v }))}
            />

            <RollingConfig
                value={config.rolling}
                options={baseMetrics}
                onChange={v => setConfig(c => ({ ...c, rolling: v }))}
            />

            <div className="flex gap-3 mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={onPreview}>Preview</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={onExport}>
                    Export
                </button>
            </div>

            {preview && (
                <>
                    <PreviewTable rows={preview.rows} groupBy={config.group_by} />
                </>
            )}
        </div>
    )
}
