import { Server } from 'node:http'

import getFastifyInstance, { FastifyInstance } from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'

import { envConfig } from '@configs/envConfig'
import { rateLimitConfig } from '@configs/rateLimitConfig'

import { authRoutes } from '@routes/authRoutes'
import { shipmentRoutes } from '@routes/shipmentRoutes'

import { SentryMonitor } from '@providers/MonitorProvider/SentryMonitor'

import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'

import { IApp } from '../interfaces/IApp'
import { IHttp } from '../interfaces/IHttp'
import { FastifyHttp } from './FastifyHttp'
import { File } from '@utils/File'
import { fileConfig } from '@configs/fileConfig'

export class FastifyApp implements IApp {
  private fastify: FastifyInstance

  constructor() {
    // const sslKeyFile = new File(fileConfig.FOLDERS.CERTIFICATES, fileConfig.FILES.SSL_KEY)
    // const sslCrtFile = new File(fileConfig.FOLDERS.CERTIFICATES, fileConfig.FILES.SSL_CRT)

    // const httpsConfig = {
    //   https: {
    //     key: sslKeyFile.read(),
    //     cert: sslCrtFile.read(),
    //   }
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
        http.send(200, 'ok')
      },
    })

    fastify.register(() => authRoutes(fastifyRouter))
    fastify.register(() => shipmentRoutes(fastifyRouter))

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
        host: '0.0.0.0'
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
