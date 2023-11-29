import 'dotenv/config'
import './configs/envConfig'
import fastify from 'fastify'

const PORT = process.env.PORT

if (!PORT) {
  throw new Error('Env Port not found')
}

const app = fastify()

app.get('/hello', () => {
  return 'hello, world'
})

app
  .listen({
    port: Number(PORT),
  })
  .then(() => {
    console.log('HTTP Server Running on Port: ' + PORT)
  })
