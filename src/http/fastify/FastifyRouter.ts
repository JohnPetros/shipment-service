import { FastifyInstance } from 'fastify'
import { IRouter } from '../interfaces/IRouter'
import { FastifyHttp } from './FastifyHttp'
import { ICrontroller } from '../../controllers/IController'

export class FastifyRouter implements IRouter {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  get(route: string, controller: ICrontroller): void {
    this.fastify.get(route, (request, reply) => {
      const fastifyHttp = new FastifyHttp(request, reply)

      return controller.handle(fastifyHttp)
    })
  }

  post(route: string, controller: ICrontroller): void {
    this.fastify.post(route, (request, reply) => {
      const fastifyHttp = new FastifyHttp(request, reply)

      return controller.handle(fastifyHttp)
    })
  }
}
