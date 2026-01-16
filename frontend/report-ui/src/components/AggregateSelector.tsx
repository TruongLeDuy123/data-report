import type { AggregationType } from "../types/report"

interface Props {
    options: string[]
    value: Record<string, AggregationType>
    onChange(v: Record<string, AggregationType>): void
}

const AGGS: AggregationType[] = ["sum", "mean", "min", "max"]

export function AggregationSelector({ options, value, onChange }: Props) {
    return (
        <>
            <h3>Aggregation</h3>
            {options.map(m => (
                <div key={m}>
                    {m}
                    <select 
                        value={value[m] ?? ""}
                        onChange={e =>
                            onChange({
                                ...value,
                                [m]: e.target.value as AggregationType
                            })
                        }
                    >
                        <option value="">--</option>
                        {AGGS.map(a => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </>
    )
}
