interface Props {
    metrics: string[]
    value: string[]
    onChange(v: string[]): void
}

export function MetricsSelector({ metrics, value, onChange }: Props) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Metrics</h3>

            <div className="grid grid-cols-2 gap-2">
                {metrics.map(m => (
                    <label
                        key={m}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            checked={value.includes(m)}
                            onChange={() =>
                                onChange(
                                    value.includes(m)
                                        ? value.filter(x => x !== m)
                                        : [...value, m]
                                )
                            }
                        />
                        {m}
                    </label>
                ))}
            </div>
        </div>
    )
}
