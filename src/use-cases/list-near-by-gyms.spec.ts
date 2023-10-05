import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { ListNearByGymsUseCase } from './list-near-by-gyms'

let gymsRepository: InMemoryGymsRepository
let listNearByGymsUseCase: ListNearByGymsUseCase
describe('List near by gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    listNearByGymsUseCase = new ListNearByGymsUseCase(gymsRepository)
  })

  it('Should be able to list near by gyms (10km limit)', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: new Decimal(-15.8399918),
      longitude: new Decimal(-47.8136491),
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: new Decimal(-18.8399918),
      longitude: new Decimal(-42.8136491),
    })

    const { gyms } = await listNearByGymsUseCase.execute({
      userLatitude: -15.8399918,
      userLongitude: -47.8136491,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
