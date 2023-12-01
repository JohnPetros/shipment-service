import { Jwt } from '../../entities/Jwt'
import { Quote } from '../../entities/Quote'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'

export interface IShipmentProvider {
  authorize(): Promise<string>
  getToken(code: string): Promise<Jwt>
  refreshToken(refreshToken: string): Promise<Jwt>
  calculate(payload: CalculateQuotePayload, token: string): Promise<Quote[]>
  handleApiError(error: unknown): void
}
