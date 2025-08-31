import { Horarios } from '../types'
const tz = 'America/Bogota'
const days = ['dom','lun','mar','mie','jue','vie','sab'] as const
export type DayKey = typeof days[number]
export function getBogotaNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: tz })) }
export function dayKey(d: Date) { return days[d.getDay()] as DayKey }
export function isFreeToday(dias: string[], day: DayKey) { return dias.map(x => x.toLowerCase()).includes(day) }
function parseRange(s: string) { const [a,b] = s.split('-'); return { start: toMin(a), end: toMin(b) } }
function toMin(hhmm: string) { const [hh, mm] = hhmm.split(':').map(Number); return hh*60+mm }
function isOpenRange(nowMin: number, start: number, end: number) { if (start===end) return false; if (start<end) return nowMin>=start && nowMin<end; return nowMin>=start || nowMin<end }
function prevDay(k: DayKey): DayKey { const idx = days.indexOf(k); return days[(idx+6)%7] as DayKey }
export function openNow(h: Horarios, now: Date) {
  const dk = dayKey(now)
  const nowMin = now.getHours()*60 + now.getMinutes()
  const today = (h as any)[dk] as string
  if (today && today.toLowerCase() !== 'cerrado') { const {start,end}=parseRange(today); if (isOpenRange(nowMin,start,end)) return true }
  const pd = prevDay(dk)
  const prev = (h as any)[pd] as string
  if (prev && prev.toLowerCase() !== 'cerrado') { const {start,end}=parseRange(prev); if (start> end && nowMin<end) return true }
  return false
}
export function todaySchedule(h: Horarios, now: Date) { const dk = dayKey(now); return (h as any)[dk] as string }