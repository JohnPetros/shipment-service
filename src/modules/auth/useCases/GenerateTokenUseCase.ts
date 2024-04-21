import { ICache } from '@cache/ICache'
import { IShipmentProvider } from '../../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../../utils/AppError'
import { cacheConfig } from '@configs/cacheConfig'

export class GenerateTokenUseCase {
  private shipmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shipmentProvider: IShipmentProvider, cache: ICache) {
    this.shipmentProvider = shipmentProvider
    this.cache = cache
  }

  async execute(code: string) {
    if (!code) throw new AppError('Invalid code', 401)

    try {
      const jwt = await this.shipmentProvider.getToken(code)

      await Promise.all([
        this.cache.set(cacheConfig.KEYS.ACCESS_TOKEN, jwt.accessToken),
        this.cache.set(cacheConfig.KEYS.REFRESH_TOKEN, jwt.refreshToken),
      ])

      return jwt
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to generate token', 500)
    }
  }
}
