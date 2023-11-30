import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'

export class GenerateTokenUseCase {
  private shippmentProvider: IShipmentProvider

  constructor(shippmentProvider: IShipmentProvider) {
    this.shippmentProvider = shippmentProvider
  }

  async execute(code: string) {
    if (!code) throw new AppError('Invalid code', 401)

    try {
      return await this.shippmentProvider.getToken(code)
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to generate token', 500)
    }
  }
}
