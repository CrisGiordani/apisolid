import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase
describe('Create Gym use case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -15.8399918,
      longitude: -47.8136491,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
