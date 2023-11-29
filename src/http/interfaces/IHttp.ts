import { IRequest } from './IRequest'

export interface IHttp {
  getRequest(): IRequest
  send(statusCode: number, response: unknown): JSON
}
