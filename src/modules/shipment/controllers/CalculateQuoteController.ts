import { Cache } from '@cache/index'
import { IHttp } from '../../../http/interfaces/IHttp'
import { CalculateQuoteUseCase } from '../useCases/CalculateQuoteUseCase'
import { ICrontroller } from '../../../http/interfaces/IController'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { CalculateQuoteDTO } from '../dtos/CalculateQuoteDTO'

export class CalculateQuoteController implements ICrontroller {
  async handle(http: IHttp) {
    const { zipcode, products } = http.getBody<CalculateQuoteDTO>()

    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(
      axiosHttpClientProvider,
    )
    const calculateUseCase = new CalculateQuoteUseCase(
      shippmentProvider,
      new Cache(),
    )

    const shipmentServices = await calculateUseCase.execute({
      zipcode,
      products,
    })

    http.send(200, shipmentServices)
  }
}
