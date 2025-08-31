import { Museo } from '../types'
import { dayKey, isFreeToday, openNow, getBogotaNow } from '../utils/time'
import placeholder from '../assets/placeholder.jpg'
import { useState } from 'react'
type Props = { museo: Museo | null; onClose: () => void; imageUrl: string }
export default function DetailsModal({ museo, onClose, imageUrl }: Props) {
  if (!museo) return null
  const now = getBogotaNow()
  const abierto = openNow(museo.horarios, now)
  const day = dayKey(now)
  const gratis = isFreeToday(museo.diasGratuitos, day)
  const hs = museo.horarios
  const comoLlegar = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(museo.direccion + ', Bogotá')}`
  const [src, setSrc] = useState(imageUrl || '')
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal>
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img src={src} alt={museo.nombre} className="w-full h-full object-cover" onError={() => setSrc(placeholder)} />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{museo.nombre}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${abierto ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{abierto ? 'Abierto' : 'Cerrado'}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{museo.descripcionCorta}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Dirección:</span> {museo.direccion}</div>
              <div><span className="font-medium">Localidad:</span> {museo.localidad}</div>
              <div><span className="font-medium">Barrio:</span> {museo.barrio}</div>
              {museo.telefono && <div><span className="font-medium">Teléfono:</span> <a href={`tel:${museo.telefono}`}>{museo.telefono}</a></div>}
              {museo.sitioWeb && <div><span className="font-medium">Sitio web:</span> <a href={museo.sitioWeb} target="_blank">Abrir</a></div>}
              <div className="flex gap-2 mt-2">
                <a className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-800" href={comoLlegar} target="_blank">Cómo llegar</a>
              </div>
            </div>
            <div className="text-sm">
              <div className="font-medium mb-1">Horarios</div>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="py-0.5">Lun</td><td className="py-0.5 text-right">{hs.lun}</td></tr>
                  <tr><td className="py-0.5">Mar</td><td className="py-0.5 text-right">{hs.mar}</td></tr>
                  <tr><td className="py-0.5">Mié</td><td className="py-0.5 text-right">{hs.mie}</td></tr>
                  <tr><td className="py-0.5">Jue</td><td className="py-0.5 text-right">{hs.jue}</td></tr>
                  <tr><td className="py-0.5">Vie</td><td className="py-0.5 text-right">{hs.vie}</td></tr>
                  <tr><td className="py-0.5">Sáb</td><td className="py-0.5 text-right">{hs.sab}</td></tr>
                  <tr><td className="py-0.5">Dom</td><td className="py-0.5 text-right">{hs.dom}</td></tr>
                </tbody>
              </table>
              {gratis && <div className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-indigo-600 text-white">Gratis hoy</div>}
              <div className="mt-2 text-xs text-gray-500">Verifica horarios y tarifas antes de ir.</div>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}