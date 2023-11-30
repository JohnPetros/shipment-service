import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttp } from '../interfaces/IHttp'

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

  setCookie(name: string, data: string, expiresIn: number): void {
    const maxAge = expiresIn ?? 1000 * 60 * 60 * 24 // 1 day
    this.reply.cookie(name, data, {
      path: '/',
      maxAge,
    })
  }

  send(statusCode: number, response: unknown) {
    return this.reply.status(statusCode).send(response) as unknown as JSON
  }
}
