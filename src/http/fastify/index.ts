import { authRoutes } from '../../routes/authRoutes'
import Bootstrap from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import { envConfig } from '../../configs/envConfig'

export class Fastify {
  async init() {
    const fastify = Bootstrap()

    const fastifyRouter = new FastifyRouter(fastify)

    await fastify.register(() => authRoutes(fastifyRouter))

    fastify
      .listen({
        port: envConfig.PORT,
      })
      .then(() => {
        console.log('HTTP Server Running on Port: ' + envConfig.PORT)
      })

    return fastify
  }
}
