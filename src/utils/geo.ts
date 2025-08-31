import { Museo } from '../types'
import { cacheGet, cacheSet } from './cache'
const TTL = 1000 * 60 * 60 * 24 * 30
async function geocodeOne(m: Museo) {
  if (typeof m.lat === 'number' && typeof m.lng === 'number') return true
  const key = 'geo:' + m.id
  const cached = cacheGet<{ lat: number; lng: number }>(key)
  if (cached) { m.lat = cached.lat; m.lng = cached.lng; return true }
  const q = m.osmQuery || (m.direccion + ', Bogotá, Colombia')
  const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q)
  const r = await fetch(url, { headers: { 'Accept-Language': 'es' } })
  if (!r.ok) return false
  const arr = await r.json()
  if (!Array.isArray(arr) || arr.length === 0) return false
  const lat = parseFloat(arr[0].lat); const lng = parseFloat(arr[0].lon)
  m.lat = lat; m.lng = lng
  cacheSet(key, { lat, lng }, TTL)
  return true
}
export function geocodeMuseumsIfNeeded(museos: Museo[], onUpdate?: (m: Museo) => void) {
  museos.forEach(async m => { const updated = await geocodeOne(m); if (updated && onUpdate) onUpdate(m) })
}