import { FastifyReply, FastifyRequest } from 'fastify'
import { IHttp } from '../interfaces/IHttp'
import { envConfig } from '../../configs/envConfig'
import { Jwt } from '@entities/Jwt'

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

  getJwt(): Jwt | null {
    const accessToken = this.request.cookies.access_token
    const refreshToken = this.request.cookies.refresh_token
    const expiresIn = this.request.cookies.expires_in

    if (!accessToken || !refreshToken || !expiresIn) return null

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date(expiresIn),
    }
  }

  setCookie(name: string, data: string, expiresIn: Date): void {
    const maxAge = Number(expiresIn) ?? 1000 * 60 * 60 * 24 // 1 day
    this.reply.setCookie(name, data, {
      domain: envConfig.DOMAIN,
      path: '/',
      maxAge,
    })
  }

  send(statusCode: number, response: unknown) {
    return this.reply.status(statusCode).send(response) as unknown as JSON
  }
}
