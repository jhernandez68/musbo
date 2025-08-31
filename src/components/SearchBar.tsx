type Props = { value: string; onChange: (v: string) => void }
export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="block text-sm mb-1">Buscar por nombre</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Ej. Museo del Oro" className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
    </div>
  )
}