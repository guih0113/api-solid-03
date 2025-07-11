import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false // cookie não assinado
  },
  sign: {
    expiresIn: '10m' // criar novo jwt a cada 10 minutos
  }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)  
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => { // _ se refere ao request, que não é utilizado
  if(error instanceof ZodError) {
    return reply
      .status(400) //status para erro de validação
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})