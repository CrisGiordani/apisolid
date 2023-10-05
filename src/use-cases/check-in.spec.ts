import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { MaxCheckInsError } from './errors/max-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase
describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-15.8399918),
      longitude: new Decimal(-47.8136491),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -15.8399918,
      userLongitude: -47.8136491,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -15.8399918,
      userLongitude: -47.8136491,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -15.8399918,
        userLongitude: -47.8136491,
      })
    ).rejects.toBeInstanceOf(MaxCheckInsError)
  })

  it('Should be able to check in twice in different days', async () => {
    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -15.8399918,
      userLongitude: -47.8136491,
    })

    vi.setSystemTime(new Date(2023, 5, 25, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -15.8399918,
      userLongitude: -47.8136491,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -15.8295245,
        userLongitude: -47.7933176,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
