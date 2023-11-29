import 'dotenv/config'
import { envConfig } from './configs/envConfig'
import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'hello, world'
})

app
  .listen({
    port: envConfig.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running on Port: ' + envConfig.PORT)
  })
