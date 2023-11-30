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

    await generateTokenUseCase.execute(code)

    return http.send(200, code)
  }
}
