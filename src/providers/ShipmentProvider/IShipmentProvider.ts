import { Jwt } from '../../entities/Jwt'
import { Quote } from '../../entities/Quote'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'

export interface IShipmentProvider {
  authorize(): Promise<void>
  getToken(code: string): Promise<Jwt>
  calculate(payload: CalculateQuotePayload, token: string): Promise<Quote[]>
}
