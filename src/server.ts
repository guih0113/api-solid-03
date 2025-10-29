import { app } from './app'
import { env } from './env'

console.log('DATABASE_URL from env:', process.env.DATABASE_URL)

app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then(() => {
  console.log('🚀 HTTP Server Running!')
})