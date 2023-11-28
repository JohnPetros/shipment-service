import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'hello, world'
})