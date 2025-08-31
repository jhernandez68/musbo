type Props = {
  categorias: string[]
  localidades: string[]
  categoria: string
  localidad: string
  setCategoria: (v: string) => void
  setLocalidad: (v: string) => void
  abierto: boolean
  setAbierto: (v: boolean) => void
  gratisHoy: boolean
  setGratisHoy: (v: boolean) => void
}
export default function Filters(p: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Categoría</label>
        <select value={p.categoria} onChange={e => p.setCategoria(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <option value="">Todas</option>
          {p.categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Localidad</label>
        <select value={p.localidad} onChange={e => p.setLocalidad(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <option value="">Todas</option>
          {p.localidades.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input id="abierto" type="checkbox" checked={p.abierto} onChange={e => p.setAbierto(e.target.checked)} />
        <label htmlFor="abierto" className="text-sm">Abierto ahora</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="gratis" type="checkbox" checked={p.gratisHoy} onChange={e => p.setGratisHoy(e.target.checked)} />
        <label htmlFor="gratis" className="text-sm">Entrada gratuita hoy</label>
      </div>
    </div>
  )
}