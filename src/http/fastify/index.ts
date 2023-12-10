import getFastifyInstance, { FastifyInstance } from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import cookie from '@fastify/cookie'

import { Server } from 'node:http'

import { IApp } from '../interfaces/IApp'
import { FastifyHttp } from './FastifyHttp'
import { authRoutes } from '@routes/authRoutes'
import { shipmentRoutes } from '@routes/shipmentRoutes'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import { paymentRoutes } from '@routes/paymentRoutes'

export class Fastify implements IApp {
  private fastify: FastifyInstance

  constructor() {
    const fastify = getFastifyInstance()

    const fastifyRouter = new FastifyRouter(fastify)

    fastify.register(cookie)

    fastify.register(() => authRoutes(fastifyRouter), { prefix: 'auth' })
    fastify.register(() => shipmentRoutes(fastifyRouter), {
      prefix: 'shipment',
    })
    fastify.register(() => paymentRoutes(fastifyRouter), {
      prefix: 'payment',
    })

    fastify.setErrorHandler(async (error, request, reply) => {
      if (error instanceof AppError) {
        const fastifyHttp = new FastifyHttp(request, reply)
        await error.handleError(fastifyHttp)
      }

      return reply.status(500).send({
        message: `Internal app error - ${error.message}`,
      })
    })

    this.fastify = fastify
  }

  async initServer() {
    this.fastify
      .listen({
        port: envConfig.PORT,
      })
      .then(() => {
        console.log('HTTP Server Running on Port: ' + envConfig.PORT)
      })
  }

  async waitServerAvailability() {
    await this.fastify.ready()
  }

  async closeServer() {
    this.fastify.close()
  }

  getServer() {
    return this.fastify.server as Server
  }
}
