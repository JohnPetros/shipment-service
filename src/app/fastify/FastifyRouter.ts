import { FastifyInstance } from 'fastify'
import { IRouter } from '../interfaces/IRouter'
import { FastifyHttp } from './FastifyHttp'
import { ICrontroller } from '../interfaces/IController'
import { IMiddleware } from '../interfaces/IMiddleware'
import { IHttp } from '../interfaces/IHttp'

export class FastifyRouter implements IRouter {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  handleMiddlewares(middlewares: IMiddleware[], http: IHttp) {
    for (const middleware of middlewares) middleware(http)
  }

  get(
    route: string,
    controller: ICrontroller,
    ...middlewares: IMiddleware[]
  ): void {
    this.fastify.get(route, (request, reply) => {
      const fastifyHttp = new FastifyHttp(request, reply)
      this.handleMiddlewares(middlewares, fastifyHttp)
      return controller.handle(fastifyHttp)
    })
  }

  post(
    route: string,
    controller: ICrontroller,
    ...middlewares: IMiddleware[]
  ): void {
    this.fastify.post(route, (request, reply) => {
      const fastifyHttp = new FastifyHttp(request, reply)
      this.handleMiddlewares(middlewares, fastifyHttp)

      return controller.handle(fastifyHttp)
    })
  }
}
