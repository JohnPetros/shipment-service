import { ICrontroller } from '../../controllers/IController'

export interface IRouter {
  get(route: string, controller: ICrontroller): void
}
