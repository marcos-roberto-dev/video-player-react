import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}
export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,

    load: async () => {
      set({
        isLoading: true,
      })

      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },
    play: ([moduleIndex, lessonIndex]: [number, number]) => {
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        })
        return
      }

      const nextModelIndex = currentModuleIndex + 1
      const nextModule = course?.modules[nextModelIndex]

      if (nextModule) {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: nextModelIndex,
        })
      }
    },
  }
})
