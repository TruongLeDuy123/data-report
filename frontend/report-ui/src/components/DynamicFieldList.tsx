interface Props {
    title: string
    options: string[]
    value: string[]
    onChange(v: string[]): void
}

export const DynamicFieldList = ({ title, options, value, onChange }: Props) => {

    const add = () => {
        onChange([...value, ""])
    }

    const update = (i: number, v: string) => {
        const next = [...value]
        next[i] = v
        onChange(next)
    }

    const remove = (i: number) => {
        onChange(value.filter((_, idx) => idx !== i))
    }

    return (
        <>
            <h3 className="text-lg font-semibold">{title}</h3>

            {value.map((v, i) => (
                <div key={i}>
                    <select
                        value={v}
                        onChange={e => update(i, e.target.value)}
                    >
                        <option value="">-- select column --</option>
                        {options.map(opt => {
                            const used = value.includes(opt)
                            return (
                                <option key={opt} value={opt} disabled={used}>
                                    {opt}
                                </option>
                            )
                        })}


                    </select>

                    <button onClick={() => remove(i)}>❌</button>
                </div>
            ))}

            <button onClick={add}>+ Add</button>
        </>
    )
}
