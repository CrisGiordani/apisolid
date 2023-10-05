import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ListUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface ListUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: ListUserCheckInsHistoryUseCaseRequest): Promise<ListUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    )

    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return {
      checkIns,
    }
  }
}
