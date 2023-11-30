import { authRoutes } from '../../routes/authRoutes'
import Bootstrap from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import { envConfig } from '../../configs/envConfig'
import { AppError } from '../../utils/AppError'
import cookie from '@fastify/cookie'
import { shipmentRoutes } from '../../routes/shipmentRoutes'

export class Fastify {
  async init() {
    const fastify = Bootstrap()

    const fastifyRouter = new FastifyRouter(fastify)

    fastify.register(cookie)

    await Promise.all([
      fastify.register(() => authRoutes(fastifyRouter), { prefix: 'auth' }),
      fastify.register(() => shipmentRoutes(fastifyRouter), { prefix: 'shipment' })
    ])

    fastify.setErrorHandler(function (error, request, reply) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message })
      }

      return reply.status(500).send({
        message: `Internal app error - ${error.message}`,
      })
    })

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
