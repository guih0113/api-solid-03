import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']).optional().default('MEMBER')
  })

  const { name, email, password, role } = registerBodySchema.parse(request.body)
  //parse ja dispara um throw automaticamente em caso de erro, evitando a execução dos códigos seguintes

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name, 
      email, 
      password,
      role
    })
  } catch (err) {    
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message }) //status 409 indica dados duplicados
    }

    throw err
  }

  return reply.status(201).send()
}