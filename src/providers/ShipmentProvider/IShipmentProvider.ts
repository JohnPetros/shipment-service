import { Jwt } from '@entities/Jwt'
import { ShipmentService } from '@entities/ShipmentService'

import { CalculateShipmentServicesDTO } from '@modules/shipment/dtos/CalculateShipmentServicesDTO'

export interface IShipmentProvider {
  authorize(): Promise<string>
  getToken(code: string): Promise<Jwt>
  refreshToken(refreshToken: string): Promise<Jwt>
  calculate(
    { products, zipcode }: CalculateShipmentServicesDTO,
    token: string,
  ): Promise<ShipmentService[]>
  handleApiError(error: unknown): void
}
