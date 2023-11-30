import { IHttp } from '../../http/interfaces/IHttp'
import { ICrontroller } from '../IController'
import { HttpClientProvider } from '../../providers/HttpClientProvider'
import { ShipmentProvider } from '../../providers/ShipmentProvider'
import { GenerateTokenUseCase } from '../../useCases/auth/GenerateTokenUseCase'

export class CallbackController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const { code } = http.getQuery<{ code: string }>()

    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const generateTokenUseCase = new GenerateTokenUseCase(shippmentProvider)

    const { accessToken, refreshToken, expiresIn } =
      await generateTokenUseCase.execute(code)

    http.setCookie('access_token', accessToken, expiresIn)
    http.setCookie('refresh_token', refreshToken, expiresIn)

    return http.send(200, { accessToken, refreshToken, expiresIn })
  }
}
