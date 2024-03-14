import { ICrontroller } from '@app/interfaces/IController'
import { IHttp } from '@app/interfaces/IHttp'

import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'

import { AuthorizeUseCase } from '../useCases/AuthorizeUseCase'

export class AuthorizeController implements ICrontroller {
  async handle(http: IHttp) {
    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(axiosHttpClientProvider)
    const authorizeUseCase = new AuthorizeUseCase(shippmentProvider)

    const url = await authorizeUseCase.execute()

    http.redirect(url)

    // http.send(200, { url })
  }
}
