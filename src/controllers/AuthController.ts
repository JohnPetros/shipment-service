import { IHttp } from '../http/interfaces/IHttp'
import { ICrontroller } from './IController'

export class AuthController implements ICrontroller {
  handle(http: IHttp): JSON {
    return http.send(200, 'Olá, Petros!')
  }
}
