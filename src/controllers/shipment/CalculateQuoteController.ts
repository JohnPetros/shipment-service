import { Cache } from '@cache/index'
import { IHttp } from '../../http/interfaces/IHttp'
import { HttpClientProvider } from '../../providers/HttpClientProvider'
import { ShipmentProvider } from '../../providers/ShipmentProvider'
import { CalculateQuoteUseCase } from '../../useCases/shipment/CalculateQuoteUseCase'
import { ICrontroller } from '../IController'
import { CalculateQuotePayload } from './payloads/CalculateQuotePayload'

export class CalculateQuoteController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const payload = http.getBody<CalculateQuotePayload>()

    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const calculateUseCase = new CalculateQuoteUseCase(
      shippmentProvider,
      new Cache(),
    )

    const quotes = await calculateUseCase.execute(payload)

    return http.send(200, quotes)
  }
}
