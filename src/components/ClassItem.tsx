import { ChevronDown, Video } from 'lucide-react'

export function ClassItem() {
  return (
    <div>
      <button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs">
          1
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">Desvendando o Redux</strong>
          <span className="text-xs text-zinc-400">12 aulas</span>
        </div>

        <ChevronDown className=" w-5 h-5 ml-auto text-zinc-400" />
      </button>

      <nav className="relative flex flex-col gap-4 p-6">
        <button className="flex items-center gap-3 text-sm text-zinc-400">
          <Video className="w-4 h-4 text-zinc-500" />
          <span>Fundamentos do Redux</span>
          <span className="ml-auto font-mono text-xs text-zinc-500">09:13</span>
        </button>
      </nav>
    </div>
  )
}
