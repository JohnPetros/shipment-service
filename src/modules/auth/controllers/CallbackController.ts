import { IHttp } from '@http/interfaces/IHttp'
import { ICrontroller } from '@http/interfaces/IController'
import { GenerateTokenUseCase } from '../useCases/GenerateTokenUseCase'
import { Cache } from '@cache/index'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'

export class CallbackController implements ICrontroller {
  async handle(http: IHttp) {
    const { code } = http.getQuery<{ code: string }>()

    const cache = new Cache()
    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(
      axiosHttpClientProvider,
    )
    const generateTokenUseCase = new GenerateTokenUseCase(
      shippmentProvider,
      cache,
    )

    const { accessToken, refreshToken } =
      await generateTokenUseCase.execute(code)

    http.send(200, { accessToken, refreshToken })
  }
}
