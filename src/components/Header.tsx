import { MessageCircle } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Header() {
  const isLoading = useStore((store) => store.isLoading)
  const { lesson, module } = useCurrentLesson()

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>
  }

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{lesson?.title}</h1>
        <span className="text-sm text-zinc-400">Módulo "{module?.title}"</span>
      </div>
      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
        <MessageCircle className="w-4 h-4" />
        Deixar feedback
      </button>
    </header>
  )
}
