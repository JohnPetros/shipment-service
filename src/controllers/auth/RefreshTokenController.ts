import { IHttp } from '@http/interfaces/IHttp'
import { ICrontroller } from '../IController'
import { RefreshTokenUseCase } from '@useCases/auth/RefreshTokenUseCase'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { ShipmentProvider } from '@providers/ShipmentProvider'

export class CallbackController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const { code } = http.getQuery<{ code: string }>()

    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const refreshTokenUseCase = new RefreshTokenUseCase(shippmentProvider)

    const { accessToken, refreshToken, expiresIn } =
      await refreshTokenUseCase.execute(code)

    http.setCookie('access_token', accessToken, expiresIn)
    http.setCookie('refresh_token', refreshToken, expiresIn)
    http.setCookie('expires_in', expiresIn, expiresIn)

    return http.send(200, { accessToken, refreshToken, expiresIn })
  }
}
