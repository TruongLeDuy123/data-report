interface Props {
    options: string[]
    value: string[]
    onChange(v: string[]): void
}

export function GroupBySelector({ options, value, onChange }: Props) {
    function toggle(field: string) {
        onChange(
            value.includes(field)
                ? value.filter(x => x !== field)
                : [...value, field]
        )
    }

    return (
        <>
            <h3>Group by</h3>
            {options.map(f => (
                <label key={f}>
                    <input
                        type="checkbox"
                        checked={value.includes(f)}
                        onChange={() => toggle(f)}
                    />
                    {f}
                </label>
            ))}
        </>
    )
}
