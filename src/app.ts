import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import path from 'path'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
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

// Integração oficial do Swagger/OpenAPI via plugins do Fastify
app.register(fastifySwagger, {
  // usa o arquivo YAML gerado em docs/openapi.yaml como especificação estática
  mode: 'static',
  specification: {
    // Fornece o caminho absoluto para o arquivo YAML para evitar problemas em tempo de execução
    path: path.resolve(__dirname, 'docs', 'openapi.yaml'),
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list'
  },
  staticCSP: true
})

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