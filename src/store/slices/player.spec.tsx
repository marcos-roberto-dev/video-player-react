import { describe, it, expect, beforeEach } from 'vitest'
import { useStore as store, useCurrentLesson } from './player'
import { act, renderHook } from '@testing-library/react'
import { api } from '../../lib/axios'
import MockAdapter from 'axios-mock-adapter'
// const exampleState: PlayerState = {
//   isLoading: false,
//   currentModuleIndex: 0,
//   currentLessonIndex: 0,
//   course: {
//     id: 1,
//     modules: [
//       {
//         id: 1,
//         title: 'Iniciando com React',
//         lessons: [
//           { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
//           {
//             id: 'w-DW4DhDfcw',
//             title: 'Estilização do Post',
//             duration: '10:05',
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Estrutura da aplicação',
//         lessons: [
//           {
//             id: 'gE48FQXRZ_o',
//             title: 'Componente: Comment',
//             duration: '13:45',
//           },
//           { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
//         ],
//       },
//     ],
//   },
// }

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
}

const mockAxios = new MockAdapter(api)
const initialState = store.getState()
describe('player slice', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able to play', () => {
    const { play } = store.getState()
    play([1, 2])

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toBe(1)
    expect(currentLessonIndex).toBe(2)
  })

  it('should be able to play next video automatically', () => {
    store.setState({ course })
    const { next } = store.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = store.getState()

    expect(currentModuleIndex).toBe(0)
    expect(currentLessonIndex).toBe(1)
  })

  it('should be able to jump to the next module automatically', () => {
    store.setState({ course, currentLessonIndex: 1 })
    const { next } = store.getState()
    next()
    const { currentModuleIndex, currentLessonIndex } = store.getState()
    expect(currentModuleIndex).toBe(1)
    expect(currentLessonIndex).toBe(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    store.setState({ course, currentLessonIndex: 1, currentModuleIndex: 1 })
    const { next } = store.getState()
    next()
    const { currentModuleIndex, currentLessonIndex } = store.getState()
    expect(currentModuleIndex).toBe(1)
    expect(currentLessonIndex).toBe(1)
  })

  it('should be current module and lesson', async () => {
    const mockCourseResponse = {
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
    const { load } = store.getState()
    mockAxios.onGet('/courses/1').reply(200, mockCourseResponse)
    await act(async () => {
      await load()
    })
    const { result } = renderHook(() => useCurrentLesson())

    expect(result.current.module).toEqual(mockCourseResponse.modules[0])
    expect(result.current.lesson).toEqual(
      mockCourseResponse.modules[0].lessons[0],
    )
  })
})
