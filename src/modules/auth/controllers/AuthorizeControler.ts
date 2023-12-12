import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'

import { Cache } from '@cache/index'

import { AuthorizeUseCase } from 'modules/auth/useCases/AuthorizeUseCase'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'

export class AuthorizeController implements ICrontroller {
  async handle(http: IHttp) {
    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(
      axiosHttpClientProvider,
    )
    const authorizeUseCase = new AuthorizeUseCase(shippmentProvider)

    const cache = new Cache()
    console.log(cache)

    const url = await authorizeUseCase.execute()

    console.log(url)

    http.redirect(url)

    // http.send(200, { url })
  }
}
