import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  //parse ja dispara um throw automaticamente em caso de erro, evitando a execução dos códigos seguintes

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email, 
      password
    })

    const token = await reply.jwtSign(
      {
        role: user.role
      }, 
      {
        sign: {
          sub: user.id
        }
      })

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      }, 
      {
        sign: {
          sub: user.id,
          expiresIn: '7d' // usuário só perde a autenticação se ficar 7 dias sem entrar na aplicação
        }
      })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // todo o backend pode ter acesso à esse cookie
        secure: true, // cookie encriptado com https
        sameSite: true, // este cookie só é acessível dentro do mesmo domínio
        httpOnly: true // cookie não pode ser acessado pelo front-end
      })
      .status(200)
      .send({
        token
      })
  } catch (err) {    
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message }) //status 400: informações introduzidas erradas
    }

    throw err
  }
}