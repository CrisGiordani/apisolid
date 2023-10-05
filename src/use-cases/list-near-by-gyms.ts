import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface ListNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface ListNearByGymsUseCaseResponse {
  gyms: Gym[]
}

export class ListNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: ListNearByGymsUseCaseRequest): Promise<ListNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
