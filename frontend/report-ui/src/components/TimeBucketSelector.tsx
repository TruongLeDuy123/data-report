interface Props {
    value: string
    onChange(v: string): void
}

export function TimeBucketSelector({ value, onChange }: Props) {
    return (
        <>
            <h3>Time bucket</h3>
            <select value={value} onChange={e => onChange(e.target.value)}>
                <option value="">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
        </>
    )
}
