export type AggregationType = "sum" | "mean" | "min" | "max"

export interface RollingConfig {
    window: number
    metrics: string[]
}

export interface ReportConfig {
    group_by: string[]
    metrics: string[]
    aggregation: Record<string, AggregationType>
    time_bucket: string
    rolling: RollingConfig
    preview: boolean
}

export interface SchemaColumn {
    name: string
    type: "date" | "number" | "string"
}

export interface PreviewResponse {
    result_schema: SchemaColumn[]
    columns: string[]
    rows: Record<string, any>[]
    total_rows: number
}
