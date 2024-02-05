import { ICrontroller } from 'app/interfaces/IController'
import { IHttp } from 'app/interfaces/IHttp'

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

    const url = await authorizeUseCase.execute()

    http.redirect(url)

    http.send(200, { url })
  }
}
