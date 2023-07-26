import { Module } from '../components/Module'
import { Header } from '../components/Header'
import { Video } from '../components/Video'

export function Player() {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center ">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />
        <main className="relative pr-80  flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 divide-y-2 divide-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900">
            <Module
              moduleIndex={0}
              amountOfLessons={4}
              title="Desvendando o Redux"
            />
            <Module
              moduleIndex={1}
              amountOfLessons={4}
              title="Desvendando o Redux"
            />
            <Module
              moduleIndex={2}
              amountOfLessons={4}
              title="Desvendando o Redux"
            />
          </aside>
        </main>
      </div>
    </div>
  )
}
