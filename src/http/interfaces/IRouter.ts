import { ICrontroller } from '../../controllers/IController'
import { IMiddleware } from './IMiddleware'

export interface IRouter {
  get(route: string, controller: ICrontroller, ...middlewares: IMiddleware[]): void
  post(
    route: string,
    controller: ICrontroller,
    ...middlewares: IMiddleware[]
  ): void
}
