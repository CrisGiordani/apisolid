import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(userRepository)
  })

  it('Should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should NOT be able to authenticate with invalid email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'john@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('Should NOT be able to authenticate with invalid password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '1234567890',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
