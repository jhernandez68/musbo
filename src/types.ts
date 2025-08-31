export type Horarios = { lun: string; mar: string; mie: string; jue: string; vie: string; sab: string; dom: string }
export type Museo = {
  id: string
  nombre: string
  categoria: string
  barrio: string
  localidad: string
  direccion: string
  telefono: string
  sitioWeb: string
  horarios: Horarios
  diasGratuitos: string[]
  accesibilidad: string[]
  descripcionCorta: string
  osmQuery: string
  wikipediaTitle: string
  lat?: number
  lng?: number
  imagen?: string
}