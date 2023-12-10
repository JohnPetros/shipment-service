import { IHttp } from '../../../http/interfaces/IHttp'
import { ICrontroller } from '../../../http/interfaces/IController'
import { HttpClientProvider } from '../../../providers/HttpClientProvider'
import { ShipmentProvider } from '../../../providers/ShipmentProvider'
import { GenerateTokenUseCase } from '../useCases/GenerateTokenUseCase'
import { Cache } from '@cache/index'

export class CallbackController implements ICrontroller {
  async handle(http: IHttp) {
    const { code } = http.getQuery<{ code: string }>()

    const cache = new Cache()
    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const generateTokenUseCase = new GenerateTokenUseCase(
      shippmentProvider,
      cache,
    )

    const { accessToken, refreshToken } =
      await generateTokenUseCase.execute(code)

    http.send(200, { accessToken, refreshToken })
  }
}
