import { describe, it, expect } from 'vitest'
import {
  PlayerState,
  next,
  play,
  player as reducer,
  useCurrentLesson,
} from './player'
import { renderHook } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

const exampleState: PlayerState = {
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
}

describe('player slice', () => {
  it('should be start course', () => {
    const exampleState: PlayerState = {
      currentModuleIndex: 0,
      currentLessonIndex: 0,
      course: null,
    }
    const course = {
      id: 1,
      modules: [
        {
          id: 1,
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            {
              id: 'w-DW4DhDfcw',
              title: 'Estilização do Post',
              duration: '10:05',
            },
          ],
        },
      ],
    }
    const state = reducer(exampleState, start(course))

    expect(state.course).toEqual(course)
  })

  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toBe(0)
    expect(state.currentLessonIndex).toBe(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer({ ...exampleState, currentLessonIndex: 1 }, next())

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer(
      { ...exampleState, currentLessonIndex: 1, currentModuleIndex: 1 },
      next(),
    )

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(1)
  })

  it('should be current module and lesson', () => {
    const store = configureStore({
      reducer: {
        player: createSlice({
          name: 'player',
          initialState: exampleState,
          reducers: {},
        }).reducer,
      },
    })

    const { result } = renderHook(() => useCurrentLesson(), {
      wrapper: ({ children }) => (
        <ReduxProvider store={store}>{children}</ReduxProvider>
      ),
    })

    expect(result.current.module).toEqual(exampleState.course?.modules[0])
    expect(result.current.lesson).toEqual(
      exampleState.course?.modules[0].lessons[0],
    )
  })
})
