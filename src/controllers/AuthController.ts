import { IHttp } from '../http/interfaces/IHttp'
import { ICrontroller } from './IController'

export class AuthController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    return http.send(200, 'Olá, Petros!')
  }
}
