import { ICrontroller } from '../IController'
import { IHttp } from '@http/interfaces/IHttp'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { AuthorizeUseCase } from '@useCases/auth/AuthorizeUseCase'

export class AuthorizeController implements ICrontroller {
  async handle(http: IHttp) {
    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const authorizeUseCase = new AuthorizeUseCase(shippmentProvider)

    const url = await authorizeUseCase.execute()

    console.log(url)

    // http.redirect(
    //   'https://sandbox.melhorenvio.com.br/oauth/authorize?client_id=3930&redirect_uri=https://sdl5yh-3333.csb.app/auth/callback&response_type=code&sate=111&scope=shipping-calculate',
    // )

    http.send(200, url)
  }
}
