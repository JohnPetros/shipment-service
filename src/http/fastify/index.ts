import getFastifyInstance, { FastifyInstance } from 'fastify'
import { FastifyRouter } from './FastifyRouter'
import cookie from '@fastify/cookie'

import { Server } from 'node:http'

import { IApp } from '../interfaces/IApp'
import { authRoutes } from '@routes/authRoutes'
import { shipmentRoutes } from '@routes/shipmentRoutes'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'

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

    fastify.setErrorHandler((error, request, reply) => {
      if (error instanceof AppError) {
        if (error.message === 'Invalid Token') return reply.redirect('auth/refresh_token')
        return reply.status(error.statusCode).send({ message: error.message })
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
