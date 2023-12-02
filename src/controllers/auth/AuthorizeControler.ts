import { ICrontroller } from '../IController'
import { IHttp } from '@http/interfaces/IHttp'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { AuthorizeUseCase } from '@useCases/auth/AuthorizeUseCase'

export class AuthorizeController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const authorizeUseCase = new AuthorizeUseCase(shippmentProvider)

    await authorizeUseCase.execute()

    return http.send(200, 'Olá, Mundo!')
  }
}
