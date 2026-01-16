interface Props {
    metrics: string[]
    value: string[]
    onChange(v: string[]): void
}

export function MetricsSelector({ metrics, value, onChange }: Props) {
    return (
        <>
            <h3>Metrics</h3>
            {metrics.map(m => (
                <label key={m}>
                    <input
                        type="checkbox"
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
        </>
    )
}
