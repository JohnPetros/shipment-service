import { Jwt } from '@entities/Jwt'
import { Quote } from '@entities/Quote'

import { CalculateQuoteDTO } from '@modules/shipment/dtos/CalculateQuoteDTO'

export interface IShipmentProvider {
  authorize(): Promise<string>
  getToken(code: string): Promise<Jwt>
  refreshToken(refreshToken: string): Promise<Jwt>
  calculate(
    { products, zipcode }: CalculateQuoteDTO,
    token: string,
  ): Promise<Quote[]>
  handleApiError(error: unknown): void
}
