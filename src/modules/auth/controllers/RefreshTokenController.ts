import { IHttp } from '@http/interfaces/IHttp'
import { ICrontroller } from '../../../http/interfaces/IController'
import { RefreshTokenUseCase } from 'modules/auth/useCases/RefreshTokenUseCase'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { Cache } from '@cache/index'

export class RefreshTokenController implements ICrontroller {
  async handle(http: IHttp) {
    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const refreshTokenUseCase = new RefreshTokenUseCase(
      shippmentProvider,
      new Cache(),
    )

    const previousRoute = await refreshTokenUseCase.execute()

    console.log(previousRoute)

    http.redirect(previousRoute)
  }
}
