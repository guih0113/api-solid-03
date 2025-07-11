import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // esperando a aplicação ser iniciada
  })

  afterAll(async () => {
    await app.close() // esperando a aplicaçõa ser encerrada
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Guilherme Henrique',
        email: 'gui.henriquess13@gmail.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(201)
  })
})