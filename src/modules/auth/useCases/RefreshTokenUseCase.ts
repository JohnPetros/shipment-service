import { ICache } from '@cache/ICache'
import { IShipmentProvider } from '../../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../../utils/AppError'
import { errorConfig } from '@configs/errorConfig'
import { cacheConfig } from '@configs/cacheConfig'

export class RefreshTokenUseCase {
  private shippmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shippmentProvider: IShipmentProvider, cache: ICache) {
    this.shippmentProvider = shippmentProvider
    this.cache = cache
  }

  async execute() {
    const refreshToken = await this.cache.get(cacheConfig.KEYS.REFRESH_TOKEN)
    if (!refreshToken) throw new AppError(errorConfig.AUTH.INVALID_TOKEN, 402)

    try {
      const jwt = await this.shippmentProvider.refreshToken(refreshToken)

      const [, , previousRoute] = await Promise.all([
        this.cache.set(cacheConfig.KEYS.ACCESS_TOKEN, jwt.accessToken),
        this.cache.set(cacheConfig.KEYS.REFRESH_TOKEN, jwt.refreshToken),
        this.cache.get(cacheConfig.KEYS.PREVIOUS_ROUTE),
        this.cache.delete(cacheConfig.KEYS.PREVIOUS_ROUTE),
      ])

      if (!previousRoute) throw new AppError('Failed to get previous route', 500)

      return previousRoute
    } catch (error) {
      console.error(error)
      this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to refresh token', 500)
    }
  }
}
