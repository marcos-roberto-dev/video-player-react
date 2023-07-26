import { MessageCircle } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Fundamentos do Redux</h1>
        <span className="text-sm text-zinc-400">
          Módulo "Desvendando o Redux"
        </span>
      </div>
      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
        <MessageCircle className="w-4 h-4" />
        Deixar feedback
      </button>
    </header>
  )
}
