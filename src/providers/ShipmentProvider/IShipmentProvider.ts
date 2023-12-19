import { Jwt } from '@entities/Jwt'
import { ShipmentService } from '@entities/ShipmentService'

import { CalculateQuoteDTO } from '@modules/shipment/dtos/CalculateQuoteDTO'

export interface IShipmentProvider {
  authorize(): Promise<string>
  getToken(code: string): Promise<Jwt>
  refreshToken(refreshToken: string): Promise<Jwt>
  calculate(
    { products, zipcode }: CalculateQuoteDTO,
    token: string,
  ): Promise<ShipmentService[]>
  handleApiError(error: unknown): void
}
