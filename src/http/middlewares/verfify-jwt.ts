import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
    // busca token e se este existir e valida se foi gerado por essa aplicação
    // se o token não existir, dispara erro e não executa o restante do código  
    
  } catch {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}