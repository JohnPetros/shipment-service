import { Jwt } from '../../entities/Jwt'

export interface IHttp {
  getBody<Body>(): Body
  getParams<Params>(): Params
  getQuery<Query>(): Query
  setCookie(name: string, data: unknown, expiresIn: Date): void
  getJwt(): Jwt | null
  send(statusCode: number, response: unknown): JSON
}
