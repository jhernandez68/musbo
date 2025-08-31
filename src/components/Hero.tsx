type Props = { onClick: () => void }
export default function Hero({ onClick }: Props) {
  return (
    <section className="container py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Descubre museos en Bogotá</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Guía gratuita con mapa, horarios y filtros. Sin registros ni pagos. Actualiza datos antes de ir.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onClick} className="px-5 py-3 rounded-2xl bg-indigo-600 text-white">Explorar museos</button>
          <a href="#faq" className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700">Preguntas frecuentes</a>
        </div>
      </div>
    </section>
  )
}