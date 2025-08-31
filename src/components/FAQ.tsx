export default function FAQ() {
  return (
    <div id="faq" className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
      <div className="mt-6 space-y-4">
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <summary className="cursor-pointer font-medium">¿Cómo moverme entre museos?</summary>
          <p className="mt-2 text-sm">Usa TransMilenio, SITP o caminar en zonas de La Candelaria. Revisa rutas en apps de mapas.</p>
        </details>
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <summary className="cursor-pointer font-medium">¿Es seguro?</summary>
          <p className="mt-2 text-sm">Evita objetos de alto valor a la vista. Prefiere horarios diurnos y vías principales.</p>
        </details>
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <summary className="cursor-pointer font-medium">¿Qué días hay entrada gratuita?</summary>
          <p className="mt-2 text-sm">Algunos museos ofrecen entrada gratuita ciertos días. Revisa “Gratis hoy”.</p>
        </details>
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <summary className="cursor-pointer font-medium">¿Cómo sé si están abiertos?</summary>
          <p className="mt-2 text-sm">La etiqueta de cada tarjeta estima el estado según los horarios publicados.</p>
        </details>
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <summary className="cursor-pointer font-medium">¿Hay accesibilidad?</summary>
          <p className="mt-2 text-sm">Se listan facilidades como rampas, ascensor o baño accesible cuando aplica.</p>
        </details>
      </div>
    </div>
  )
}