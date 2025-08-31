import { Museo } from '../types'
import { openNow, getBogotaNow, dayKey, isFreeToday } from '../utils/time'
import { getImageFor } from '../utils/wiki'
import placeholder from '../assets/placeholder.jpg'
import { useState } from 'react'
type Props = { museo: Museo; now: Date; onVerMas: () => void; onVerEnMapa: () => void }
export default function MuseumCard({ museo, now, onVerMas, onVerEnMapa }: Props) {
  const abierto = openNow(museo.horarios, now)
  const gratis = isFreeToday(museo.diasGratuitos, dayKey(getBogotaNow()))
  const [src, setSrc] = useState(getImageFor(museo))
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 flex flex-col">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img src={src} alt={museo.nombre} className="w-full h-full object-cover" loading="lazy" onError={() => setSrc(placeholder)} />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{museo.nombre}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${abierto ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{abierto ? 'Abierto' : 'Cerrado'}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{museo.localidad} • {museo.barrio}</div>
        <div className="mt-2 flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800">{museo.categoria}</span>
          {gratis && <span className="text-xs px-2 py-1 rounded-full bg-indigo-600 text-white">Gratis hoy</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={onVerEnMapa} className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700">Ver en mapa</button>
          <button onClick={onVerMas} className="px-3 py-2 rounded-xl bg-indigo-600 text-white">Más detalles</button>
        </div>
      </div>
    </div>
  )
}