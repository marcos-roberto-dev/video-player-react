import { useEffect } from 'react'
import { Module } from '../components/Module'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { useAppDispatch, useAppSelector } from '../store'
import { loadCourse } from '../store/slices/player'

export function Player() {
  const modules = useAppSelector((state) => state.player.course?.modules)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadCourse())
  }, [dispatch])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center ">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />
        <main className="relative pr-80  flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 divide-y-2 divide-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900">
            {modules ? (
              modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  amountOfLessons={module.lessons.length}
                  title={module.title}
                />
              ))
            ) : (
              <>
                <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                  <div className=" shadow rounded-md max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="h-2 bg-slate-200 rounded w-[4rem]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm bg-zinc-900 p-6">
                  <div className=" shadow rounded-md max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-slate-200 h-4 w-4"></div>
                        <div className="h-2 bg-slate-200 rounded w-[8rem]"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-slate-200 rounded w-[2rem]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
