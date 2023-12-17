import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase
describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search gym by title', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('Should be able to paginate search gym result', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
