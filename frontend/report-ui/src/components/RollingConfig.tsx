interface Props {
    value: {
        window: number
        metrics: string[]
    }
    options: string[]
    onChange(v: Props["value"]): void
}

export function RollingConfig({ value, options, onChange }: Props) {
    return (
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Rolling Window</h3>

            <div className="mb-4 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                    Window:
                </label>
                <input
                    type="number"
                    min={1}
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    value={value.window}
                    onChange={e =>
                        onChange({ ...value, window: Number(e.target.value) })
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                {options.map(m => (
                    <label
                        key={m}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            checked={value.metrics.includes(m)}
                            onChange={() =>
                                onChange({
                                    ...value,
                                    metrics: value.metrics.includes(m)
                                        ? value.metrics.filter(x => x !== m)
                                        : [...value.metrics, m]
                                })
                            }
                        />
                        {m}
                    </label>
                ))}
            </div>
        </div>
    )
}
