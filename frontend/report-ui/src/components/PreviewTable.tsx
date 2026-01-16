interface Props {
    rows: Record<string, any>[]
    groupBy?: string[]
}

export function PreviewTable({ rows, groupBy = [] }: Props) {
    if (!rows.length) return null

    const rawCols = Object.keys(rows[0])
    const groupCols = groupBy.filter(c => rawCols.includes(c))
    const metricCols = rawCols.filter(c => !groupCols.includes(c))

    const cols = [...groupCols, ...metricCols]

    return (
        <table border={1}>
            <thead>
                <tr>
                    {cols.map(c => <th key={c}>{c}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((r, i) => (
                    <tr key={i}>
                        {cols.map(c => <td key={c}>{r[c]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
