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
        <div className="mt-6 overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {cols.map(c => (
                            <th
                                key={c}
                                className="px-3 py-2 border-b text-left font-semibold text-gray-700 whitespace-nowrap"
                            >
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((r, i) => (
                        <tr
                            key={i}
                            className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
                        >
                            {cols.map(c => (
                                <td
                                    key={c}
                                    className="px-3 py-2 border-b text-gray-800 whitespace-nowrap"
                                >
                                    {r[c] !== null && r[c] !== undefined
                                        ? String(r[c])
                                        : ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
