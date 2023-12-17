import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository"
import { ListUserCheckInsHistoryUseCase } from "../list-user-check-ins-history"

export function makeListUserCheckInsHistoryUseCase() {
    const checkinsRepository = new PrismaCheckInsRepository
    const useCase = new ListUserCheckInsHistoryUseCase(checkinsRepository)

    return useCase
}