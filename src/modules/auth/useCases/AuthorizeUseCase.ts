import { IShipmentProvider } from '@providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '@utils/AppError'

export class AuthorizeUseCase {
  private shipmentProvider: IShipmentProvider

  constructor(shipmentProvider: IShipmentProvider) {
    this.shipmentProvider = shipmentProvider
  }

  async execute() {
    try {
      return await this.shipmentProvider.authorize()
    } catch (error) {
      console.error(error)
      this.shipmentProvider.handleApiError(error)
      throw new AppError('Failed to authorize user', 401)
    }
  }
}
