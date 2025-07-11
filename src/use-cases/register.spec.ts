import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Guilherme Henrique',
      email: 'guiiiii1313@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String)) // esperando que o id seja igual a qualquer string
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Guilherme Henrique',
      email: 'guiiiii1313@gmail.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    ) // retorna true caso a senha realmente tenha originado o hash correspondente

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'guilherme@teste.com'

    await sut.execute({
      name: 'Guilherme Henrique',
      email,
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'Guilherme Henrique',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError) 
    // esperando um erro, e instanciando-o para a classe UserAlreadyExistsError
    // rejects espera um erro, resolves espera sucesso
  })
})