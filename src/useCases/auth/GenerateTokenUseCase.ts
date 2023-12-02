import { ICache } from '@cache/ICache'
import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'
import { CacheKeys } from '@constants/CacheKeys'

export class GenerateTokenUseCase {
  private shippmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shippmentProvider: IShipmentProvider, cache: ICache) {
    this.shippmentProvider = shippmentProvider
    this.cache = cache
  }

  async execute(code: string) {
    if (!code) throw new AppError('Invalid code', 401)

    try {
      const jwt = await this.shippmentProvider.getToken(code)

      await Promise.all([
        this.cache.set(CacheKeys.ACCESS_TOKEN, jwt.accessToken),
        this.cache.set(CacheKeys.REFRESH_TOKEN, jwt.refreshToken),
      ])

      return jwt
    } catch (error) {
      throw new AppError('Failed to generate token', 500)
    }
  }
}
