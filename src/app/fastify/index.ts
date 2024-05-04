import { Server } from 'node:http'

import cookie from '@fastify/cookie'
// import rateLimit from '@fastify/rate-limit'
import getFastifyInstance, { FastifyInstance } from 'fastify'
import cron from "node-cron"
import { FastifyRouter } from './FastifyRouter'

import { envConfig } from '@configs/envConfig'
// import { rateLimitConfig } from '@configs/rateLimitConfig'

import { authRoutes } from '@routes/authRoutes'
import { shipmentRoutes } from '@routes/shipmentRoutes'

import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'

import { RedisCache } from '@cache/RedisCache'
import { IApp } from '../interfaces/IApp'
import { IHttp } from '../interfaces/IHttp'
import { FastifyHttp } from './FastifyHttp'

export class FastifyApp implements IApp {
  private fastify: FastifyInstance

  constructor() {
    // const sslKeyFile = new File(fileConfig.FOLDERS.CERTIFICATES, fileConfig.FILES.SSL_KEY)
    // const sslCrtFile = new File(fileConfig.FOLDERS.CERTIFICATES, fileConfig.FILES.SSL_CRT)

    // const httpsConfig = {
    //   https: {
    //     key: sslKeyFile.read(),
    //     cert: sslCrtFile.read(),
    //   },
    // }

    const fastify = getFastifyInstance()

    const fastifyRouter = new FastifyRouter(fastify)

    fastify.register(cookie)

    // fastify.register(rateLimit, {
    //   max: rateLimitConfig.MAX,
    //   timeWindow: rateLimitConfig.INTERVAL,
    // })

    fastifyRouter.get('/', {
      async handle(http: IHttp) {
        const cache = new RedisCache()
        await cache.set('teste', 'Shipment Service')

        http.send(200, 'Shipment Service')
      },
    })

    fastify.register(() => authRoutes(fastifyRouter))
    fastify.register(() => shipmentRoutes(fastifyRouter))

    const console = new Console()

    fastify.setErrorHandler(async (error, _, reply) => {
      console.error(error)

      if (error instanceof AppError) {
        reply.status(error.statusCode).send({ message: error.message })
      }

      return reply.status(500).send({
        message: `Internal app error - ${error.message}`,
      })
    })

    this.fastify = fastify
  }

  setCron(expresion: string, callback: () => Promise<void>) {
    cron.schedule(expresion, callback)
  }

  async startServer() {
    this.fastify
      .listen({
        port: envConfig.PORT,
        host: '0.0.0.0',
      })
      .then(async () => {
        console.log(`HTTP Server Running on Port: ${envConfig.PORT}`)
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
