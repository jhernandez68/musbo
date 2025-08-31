import { useEffect, useMemo, useState } from 'react'
import raw from './data/museos.json'
import { Museo } from './types'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import MuseumCard from './components/MuseumCard'
import DetailsModal from './components/DetailsModal'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import MapModal from './components/MapModal'
import { openNow, isFreeToday, getBogotaNow, dayKey } from './utils/time'
import { getImageFor, prefetchImages } from './utils/wiki'
import { geocodeMuseumsIfNeeded } from './utils/geo'
import { motion } from 'framer-motion'

export default function App() {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [gratisHoy, setGratisHoy] = useState(false)
  const [details, setDetails] = useState<Museo | null>(null)
  const [mapMuseo, setMapMuseo] = useState<Museo | null>(null)
  const [museos, setMuseos] = useState<Museo[]>(raw as Museo[])
  const now = getBogotaNow()
  const day = dayKey(now)

  useEffect(() => { geocodeMuseumsIfNeeded(museos, () => setMuseos(m => [...m])) }, [])
  useEffect(() => { prefetchImages(museos) }, [museos])
  useEffect(() => { document.body.style.overflow = (details || mapMuseo) ? 'hidden' : '' }, [details, mapMuseo])

  const localidades = useMemo(() => Array.from(new Set(museos.map(m => m.localidad))).sort(), [museos])
  const categorias = useMemo(() => Array.from(new Set(museos.map(m => m.categoria))).sort(), [museos])

  const filtrados = useMemo(() => {
    return museos.filter(m => {
      const q = query.trim().toLowerCase()
      if (q && !m.nombre.toLowerCase().includes(q)) return false
      if (localidad && m.localidad !== localidad) return false
      if (categoria && m.categoria !== categoria) return false
      if (abierto && !openNow(m.horarios, now)) return false
      if (gratisHoy && !isFreeToday(m.diasGratuitos, day)) return false
      return true
    })
  }, [museos, query, localidad, categoria, abierto, gratisHoy, now, day])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onClick={() => document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' })} />
        <section id="explorar" className="container py-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-3 items-start">
            <div className="md:col-span-1 space-y-4">
              <SearchBar value={query} onChange={setQuery} />
              <Filters
                categorias={categorias}
                localidades={localidades}
                categoria={categoria}
                localidad={localidad}
                setCategoria={setCategoria}
                setLocalidad={setLocalidad}
                abierto={abierto}
                setAbierto={setAbierto}
                gratisHoy={gratisHoy}
                setGratisHoy={setGratisHoy}
              />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 p-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="font-medium">Mapa</div>
              <div className="mt-2">Abre el mapa desde cualquier tarjeta con “Ver en mapa”. Se mostrará en una ventana con foco en el museo seleccionado.</div>
            </div>
          </div>
          <motion.div layout className="grid gap-4 card-grid sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map(m => (
              <MuseumCard key={m.id} museo={m} now={now} onVerEnMapa={() => setMapMuseo(m)} onVerMas={() => setDetails(m)} />
            ))}
          </motion.div>
        </section>
        <section className="container py-12">
          <FAQ />
        </section>
      </main>
      <Footer />
      <DetailsModal museo={details} onClose={() => setDetails(null)} imageUrl={details ? getImageFor(details) : ''} />
      <MapModal museo={mapMuseo} museos={museos} onClose={() => setMapMuseo(null)} />
    </div>
  )
}