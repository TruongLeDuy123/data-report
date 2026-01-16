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
        <>
            <h3>Rolling</h3>

            Window:
            <input
                type="number"
                min={1}
                value={value.window}
                onChange={e =>
                    onChange({ ...value, window: Number(e.target.value) })
                }
            />

            {options.map(m => (
                <label key={m}>
                    <input
                        type="checkbox"
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
        </>
    )
}
