import { Jwt } from '../../entities/Jwt'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'
import { Quote } from '../../entities/Quote'
import { IHttpClientProvider } from '../HttpClientProvider/IHttpClientProvider'
import { IShipmentProvider } from './IShipmentProvider'
import { MelhorEnvioShipmentProvider } from './MelhorEnvioShipmentProvider'

export class ShipmentProvider implements IShipmentProvider {
  private shippment: IShipmentProvider

  constructor(api: IHttpClientProvider) {
    this.shippment = new MelhorEnvioShipmentProvider(api)
  }

  async getToken(code: string): Promise<Jwt> {
    return await this.shippment.getToken(code)
  }

  async refreshToken(refreshToken: string): Promise<Jwt> {
    return await this.shippment.getToken(refreshToken)
  }

  async authorize() {
    return await this.shippment.authorize()
  }

  async calculate(
    payload: CalculateQuotePayload,
    token: string,
  ): Promise<Quote[]> {
    return await this.shippment.calculate(payload, token)
  }
}
