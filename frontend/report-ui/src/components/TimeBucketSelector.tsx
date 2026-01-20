interface Props {
    value: string
    onChange(v: string): void
}

export function TimeBucketSelector({ value, onChange }: Props) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Time Bucket</h3>

            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-48 rounded-md border-gray-300 shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
                <option value="">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
        </div>
    )
}
