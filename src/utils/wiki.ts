import { Museo } from '../types'
import placeholder from '../assets/placeholder.jpg'
import { cacheGet, cacheSet } from './cache'
const TTL = 1000 * 60 * 60 * 24 * 30
function key(id: string) { return 'img:' + id }
export function getImageFor(m: Museo) {
  if (m.imagen) return m.imagen
  const v = cacheGet<string>(key(m.id))
  return v || placeholder
}
async function fromSummary(title: string) {
  const url = 'https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title)
  const r = await fetch(url)
  if (!r.ok) return null
  const j = await r.json()
  const src = j?.thumbnail?.source as string | undefined
  return src || null
}
async function fromMediaList(title: string) {
  const url = 'https://es.wikipedia.org/api/rest_v1/page/media-list/' + encodeURIComponent(title)
  const r = await fetch(url)
  if (!r.ok) return null
  const j = await r.json()
  const items = j?.items as any[] | undefined
  if (!items) return null
  for (const it of items) {
    const thumb = it?.thumbnail?.source || it?.srcset?.[0]?.src
    if (thumb) return thumb as string
  }
  return null
}
async function fetchOne(m: Museo) {
  const k = key(m.id)
  const cached = cacheGet<string>(k)
  if (cached) return
  if (!m.wikipediaTitle) return
  const a = await fromSummary(m.wikipediaTitle)
  if (a) { cacheSet(k, a, TTL); return }
  const b = await fromMediaList(m.wikipediaTitle)
  if (b) { cacheSet(k, b, TTL); return }
}
export function prefetchImages(museos: Museo[]) { museos.forEach(m => { fetchOne(m) }) }