export function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const o = JSON.parse(raw) as { value: T; exp: number }
    if (o.exp && Date.now() > o.exp) { localStorage.removeItem(key); return null }
    return o.value
  } catch { return null }
}
export function cacheSet<T>(key: string, value: T, ttlMs: number) {
  const exp = Date.now() + ttlMs
  localStorage.setItem(key, JSON.stringify({ value, exp }))
}