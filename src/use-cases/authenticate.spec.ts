import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository) // system under test
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Guilherme Henrique',
      email: 'guiiiii1313@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'guiiiii1313@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String)) // esperando que o id seja igual a qualquer string
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() => 
      sut.execute({
        email: 'guiiiii1313@gmail.com',
        password: '123456'
      })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Guilherme Henrique',
      email: 'guiiiii1313@gmail.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => 
      sut.execute({
        email: 'guiiiii1313@gmail.com',
        password: '12133532'
      })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})