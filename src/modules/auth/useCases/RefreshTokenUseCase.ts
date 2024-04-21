import { ICache } from '@cache/ICache'
import { IShipmentProvider } from '../../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../../utils/AppError'
import { errorConfig } from '@configs/errorConfig'
import { cacheConfig } from '@configs/cacheConfig'

export class RefreshTokenUseCase {
  private shipmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shipmentProvider: IShipmentProvider, cache: ICache) {
    this.shipmentProvider = shipmentProvider
    this.cache = cache
  }

  async execute() {
    const refreshToken = await this.cache.get(cacheConfig.KEYS.REFRESH_TOKEN)
    if (!refreshToken) throw new AppError('Refresh token is not found', 402)

    try {
      const jwt = await this.shipmentProvider.refreshToken(refreshToken)

      await Promise.all([
        this.cache.set(cacheConfig.KEYS.ACCESS_TOKEN, jwt.accessToken),
        this.cache.set(cacheConfig.KEYS.REFRESH_TOKEN, jwt.refreshToken),
      ])
    } catch (error) {
      console.error(error)
      this.shipmentProvider.handleApiError(error)
      throw new AppError('Failed to refresh token', 500)
    }
  }
}
