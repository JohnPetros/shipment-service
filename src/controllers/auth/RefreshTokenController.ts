import { IHttp } from '@http/interfaces/IHttp'
import { ICrontroller } from '../IController'
import { RefreshTokenUseCase } from '@useCases/auth/RefreshTokenUseCase'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { Cache } from '@cache/index'

export class RefreshTokenController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const refreshTokenUseCase = new RefreshTokenUseCase(
      shippmentProvider,
      new Cache(),
    )

    const { accessToken, refreshToken } = await refreshTokenUseCase.execute()

    return http.send(200, { accessToken, refreshToken })
  }
}
