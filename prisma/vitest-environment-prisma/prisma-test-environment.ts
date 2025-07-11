import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from 'generated/prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  // schema public é o schema primário

  if(!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'ssr',
  // método setup é executado antes de cada teste
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy') // utilizando deploy ao invés do dev para pular as etapas de comparação

    return {
      // método teardown executa após o encerramento dos testes
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
        // cascade elimina tudo o que for criado junto com o schema
      }
    }
  },
}