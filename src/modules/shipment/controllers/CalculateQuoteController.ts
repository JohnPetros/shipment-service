import { Cache } from '@cache/index'
import { IHttp } from '../../../http/interfaces/IHttp'
import { HttpClientProvider } from '../../../providers/HttpClientProvider'
import { ShipmentProvider } from '../../../providers/ShipmentProvider'
import { CalculateQuoteUseCase } from '../useCases/CalculateQuoteUseCase'
import { ICrontroller } from '../../../http/interfaces/IController'
import { CalculateQuotePayload } from '../../../controllers/shipment/payloads/CalculateQuotePayload'

export class CalculateQuoteController implements ICrontroller {
  async handle(http: IHttp) {
    const payload = http.getBody<CalculateQuotePayload>()

    const httpClientProvider = new HttpClientProvider()
    const shippmentProvider = new ShipmentProvider(httpClientProvider)
    const calculateUseCase = new CalculateQuoteUseCase(
      shippmentProvider,
      new Cache(),
    )

    const quotes = await calculateUseCase.execute(payload)

    http.send(200, quotes)
  }
}
