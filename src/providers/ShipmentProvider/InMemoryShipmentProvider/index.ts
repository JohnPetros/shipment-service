import { ShipmentService } from '@entities/ShipmentService'
import { CalculateShipmentServicesDTO } from '@modules/shipment/dtos/CalculateShipmentServicesDTO'
import { Jwt } from '@entities/Jwt'
import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'
import { IShipmentProvider } from '../IShipmentProvider'

export class InMemoryShipmentProvider implements IShipmentProvider {
  async authorize(): Promise<string> {
    throw new Error('Method is not implemented')
  }

  async calculate(
    { products, zipcode }: CalculateShipmentServicesDTO,
    token: string
  ): Promise<ShipmentService[]> {
    return [shipmentServiceMock]
  }

  async getToken(code: string): Promise<Jwt> {
    throw new Error('Method is not implemented')
  }

  refreshToken(refreshToken: string): Promise<Jwt> {
    throw new Error('Method is not implemented')
  }

  handleApiError(error: unknown): void {
    console.log(error)
  }
}
