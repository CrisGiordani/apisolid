import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase
describe('Validate check-in use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckin = await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01'
        })

        const { checkIn } = await validateCheckInUseCase.execute({
            checkinId: createdCheckin.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

})
