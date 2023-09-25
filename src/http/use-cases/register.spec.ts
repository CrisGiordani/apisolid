import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let inMemoryUserRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase
describe('Register use case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUsersRepository
        registerUseCase = new RegisterUseCase(inMemoryUserRepository)
    })

    it('Should be able to register', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('Should crypt user password upon registration', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe2@example.com',
            password: '123456'
        })

        const isPasswordCorrectHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectHashed).toBe(true)
    })

    it('Should not able to register with an email already used', async () => {
        const email = 'johndoe2@example.com'

        await registerUseCase.execute({
            name: 'John Doe 1',
            email,
            password: '123456'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'John Doe 2',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})