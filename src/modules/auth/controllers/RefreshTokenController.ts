import { IHttp } from 'app/interfaces/IHttp'
import { ICrontroller } from '../../../app/interfaces/IController'
import { RefreshTokenUseCase } from 'modules/auth/useCases/RefreshTokenUseCase'
import { Cache } from '@cache/index'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'

export class RefreshTokenController implements ICrontroller {
  async handle(http: IHttp) {
    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(
      axiosHttpClientProvider,
    )
    const refreshTokenUseCase = new RefreshTokenUseCase(
      shippmentProvider,
      new Cache(),
    )

    const previousRoute = await refreshTokenUseCase.execute()

    console.log(previousRoute)

    http.redirect(previousRoute)
  }
}
