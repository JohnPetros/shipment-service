import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttp } from '../interfaces/IHttp'
import { envConfig } from '../../configs/envConfig'

export class FastifyHttp implements IHttp {
  private request: FastifyRequest
  private reply: FastifyReply

  constructor(request: FastifyRequest, reply: FastifyReply) {
    this.request = request
    this.reply = reply
  }

  getBody<Body>(): Body {
    return this.request.body as Body
  }

  getQuery<Query>(): Query {
    return this.request.query as Query
  }

  getParams<Params>(): Params {
    return this.request.params as Params
  }

  getPreviusRoute(): string {
    return this.request.originalUrl
  }

  setCookie(name: string, data: string, expiresIn: number): void {
    const maxAge = expiresIn ?? 1000 * 60 * 60 * 24 // 1 day
    this.reply.setCookie(name, data, {
      domain: envConfig.DOMAIN,
      path: '/',
      maxAge,
    })
  }

  redirect(route: string) {
    this.reply.redirect(307, route)
  }

  send(statusCode: number, response: unknown) {
    return this.reply.status(statusCode).send(response) as unknown as JSON
  }
}
