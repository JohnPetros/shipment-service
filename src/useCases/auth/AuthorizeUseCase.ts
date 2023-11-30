import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'

export class AuthorizeUseCase {
  private shippmentProvider: IShipmentProvider

  constructor(shippmentProvider: IShipmentProvider) {
    this.shippmentProvider = shippmentProvider
  }

  async execute() {
    try {
      await this.shippmentProvider.authorize()
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to authorize user', 401)
    }
  }
}
