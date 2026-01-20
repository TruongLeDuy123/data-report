interface Props {
    onSelect(file: File): void
}

export function FileUpload({ onSelect }: Props) {
    return (
        <div>
            <label className="block text-lg font-semibold mb-2">
                Upload CSV / Excel
            </label>

            <input
                type="file"
                accept=".csv,.xlsx"
                className="block w-full text-sm text-gray-600
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
                onChange={e => {
                    if (e.target.files?.[0]) {
                        onSelect(e.target.files[0])
                    }
                }}
            />
        </div>
    )
}
