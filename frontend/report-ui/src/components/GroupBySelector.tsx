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
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Group By</h3>

            <div className="grid grid-cols-2 gap-2">
                {options.map(f => (
                    <label
                        key={f}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="rounded border-gray-500 text-blue-600 focus:ring-blue-500"
                            checked={value.includes(f)}
                            onChange={() => toggle(f)}
                        />
                        {f}
                    </label>
                ))}
            </div>
        </div>
    )
}
