import { Jwt } from '../../Entities/Jwt'
import { Quote } from '../../Entities/Quote'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'

export interface IShipmentProvider {
  authorize(): Promise<void>
  getToken(code: string): Promise<Jwt>
  calculate(payload: CalculateQuotePayload, token: string): Promise<Quote[]>
}
