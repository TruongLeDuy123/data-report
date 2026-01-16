interface Props {
    onSelect(file: File): void
}

export function FileUpload({ onSelect }: Props) {
    return (
        <input
            type="file"
            accept=".csv,.xlsx"
            onChange={e => {
                if (e.target.files?.[0]) {
                    onSelect(e.target.files[0])
                }
            }}
        />
    )
}
