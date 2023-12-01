import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'

export class RefreshTokenUseCase {
  private shippmentProvider: IShipmentProvider

  constructor(shippmentProvider: IShipmentProvider) {
    this.shippmentProvider = shippmentProvider
  }

  async execute(refreshToken: string) {
    if (!refreshToken) throw new AppError('Invalid refresh token', 401)

    try {
      return await this.shippmentProvider.refreshToken(refreshToken)
    } catch (error) {
      this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to refresh token', 500)
    }
  }
}
