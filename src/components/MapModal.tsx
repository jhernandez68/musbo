import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
import { Museo } from '../types'
L.Icon.Default.mergeOptions({ iconRetinaUrl: marker2x, iconUrl: marker, shadowUrl: shadow })
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => { map.flyTo([lat, lng], 16, { duration: 0.6 }) }, [lat, lng, map])
  return null
}
const BlueIcon = L.divIcon({ className: '', html: '<div class="focus-dot"></div>', iconSize: [18,18], iconAnchor: [9,9] })
type Props = { museo: Museo | null; museos: Museo[]; onClose: () => void }
export default function MapModal({ museo, museos, onClose }: Props) {
  if (!museo) return null
  const center: [number, number] = museo.lat && museo.lng ? [museo.lat, museo.lng] : [4.711, -74.0721]
  return (
    <div className="fixed inset-0 z-[10000] bg-black/70 p-3 sm:p-6 flex">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full overflow-hidden relative flex flex-col">
        <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <div className="font-semibold">{museo.nombre}</div>
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700">Cerrar</button>
        </div>
        <div className="flex-1 min-h-0">
          <MapContainer center={center} zoom={14} style={{ width: '100%', height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            <MarkerClusterGroup chunkedLoading>
              {museos.filter(m => m.lat && m.lng).map(m => (
                <Marker key={m.id} position={[m.lat!, m.lng!]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">{m.nombre}</div>
                      <div>{m.localidad}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            {museo.lat && museo.lng && (<><Marker position={[museo.lat, museo.lng]} icon={BlueIcon} /><FlyTo lat={museo.lat} lng={museo.lng} /></>)}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}