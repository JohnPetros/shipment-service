import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttp } from '../interfaces/IHttp'
import { IRequest } from '../interfaces/IRequest'

export class FastifyHttp implements IHttp {
  private request: FastifyRequest
  private reply: FastifyReply

  constructor(request: FastifyRequest, reply: FastifyReply) {
    this.request = request
    this.reply = reply
  }

  getRequest(): IRequest {
    return {
      body: this.request.body,
      params: this.request.params,
    }
  }

  send(statusCode: number, response: unknown) {
    return this.reply.status(statusCode).send(response) as unknown as JSON
  }
}
