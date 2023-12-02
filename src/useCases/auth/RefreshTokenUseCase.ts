import { ICache } from '@cache/ICache'
import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'
import { CacheKeys } from '@constants/CacheKeys'
import { AppErrors } from '@constants/AppErrors'

export class RefreshTokenUseCase {
  private shippmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shippmentProvider: IShipmentProvider, cache: ICache) {
    this.shippmentProvider = shippmentProvider
    this.cache = cache
  }

  async execute() {
    const refreshToken = await this.cache.get<string>(CacheKeys.REFRESH_TOKEN)
    if (!refreshToken) throw new AppError(AppErrors.INVALID_TOKEN, 402)

    try {
      const jwt = await this.shippmentProvider.refreshToken(refreshToken)

      await Promise.all([
        this.cache.set(CacheKeys.ACCESS_TOKEN, jwt.accessToken),
        this.cache.set(CacheKeys.REFRESH_TOKEN, jwt.refreshToken),
      ])

      return jwt
    } catch (error) {
      console.error(error)
      this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to refresh token', 500)
    }
  }
}
