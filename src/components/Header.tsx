import { useEffect, useState } from 'react'
export default function Header() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') { document.documentElement.classList.add('dark'); setDark(true) }
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) { document.documentElement.classList.add('dark'); localStorage.setItem('theme','dark') }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme','light') }
  }
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div className="container h-14 flex items-center justify-between">
        <a href="#" className="font-bold text-lg">Museos de Bogotá</a>
        <div className="flex items-center gap-3">
          <a href="#explorar" className="text-sm">Explorar</a>
          <a href="#faq" className="text-sm">FAQ</a>
          <button onClick={toggle} className="px-3 py-1 rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-sm">Modo {dark ? 'claro' : 'oscuro'}</button>
        </div>
      </div>
    </header>
  )
}