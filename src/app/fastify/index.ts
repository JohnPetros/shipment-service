import getFastifyInstance, { FastifyInstance } from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'

import { Server } from 'node:http'

import { IApp } from '../interfaces/IApp'
import { FastifyHttp } from './FastifyHttp'
import { authRoutes } from '@routes/authRoutes'
import { shipmentRoutes } from '@routes/shipmentRoutes'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'
import { paymentRoutes } from '@routes/paymentRoutes'
import { rateLimitConfig } from '@configs/rateLimitConfig'
import { SentryMonitor } from '@providers/MonitorProvider/SentryMonitor'

export class FastifyApp implements IApp {
  private fastify: FastifyInstance

  constructor() {
    const fastify = getFastifyInstance()

    const fastifyRouter = new FastifyRouter(fastify)

    fastify.register(cookie)

    // fastify.register(rateLimit, {
    //   max: rateLimitConfig.MAX,
    //   timeWindow: rateLimitConfig.INTERVAL,
    // })

    // fastify.register(() => authRoutes(fastifyRouter))
    // fastify.register(() => shipmentRoutes(fastifyRouter))
    fastify.register(() => paymentRoutes(fastifyRouter))

    const sentryMonitor = new SentryMonitor()
    const console = new Console()

    fastify.setErrorHandler(async (error, request, reply) => {
      console.error(error)

      if (error instanceof AppError) {
        const fastifyHttp = new FastifyHttp(request, reply)
        await error.handleError(fastifyHttp)

        if (error.statusCode === 500 || error.statusCode === 429) {
          sentryMonitor.logError(error)
        }
      }

      return reply.status(500).send({
        message: `Internal app error - ${error.message}`,
      })
    })

    this.fastify = fastify
  }

  async startServer() {
    this.fastify
      .listen({
        port: envConfig.PORT,
      })
      .then(async () => {
        console.log('HTTP Server Running on Port: ' + envConfig.PORT)
      })
  }

  async stopServer() {
    this.fastify.close()
  }

  async waitServerAvailability() {
    await this.fastify.ready()
  }

  getServer() {
    return this.fastify.server as Server
  }
}
