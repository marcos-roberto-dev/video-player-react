import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

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
}

const initialState: PlayerState = {
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  course: null,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload
    },
    play: (state, action) => {
      const [moduleIndex, lessonIndex] = action.payload
      state.currentModuleIndex = moduleIndex
      state.currentLessonIndex = lessonIndex
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
        return
      }

      const nextModelIndex = state.currentModuleIndex + 1
      const nextModule = state.course?.modules[nextModelIndex]

      if (nextModule) {
        state.currentModuleIndex = nextModelIndex
        state.currentLessonIndex = 0
      }
    },
  },
})

export const player = playerSlice.reducer
export const { play, next, start } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player
    const module = state.player.course?.modules[currentModuleIndex]
    const lesson =
      state.player.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ]
    return { module, lesson }
  })
}
