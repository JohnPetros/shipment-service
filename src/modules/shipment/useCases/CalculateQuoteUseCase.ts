import { ShipmentService } from '@entities/ShipmentService'

import { IShipmentProvider } from '@providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '@utils/AppError'
import { ICache } from '@cache/ICache'
import { cacheConfig } from '@configs/cacheConfig'
import { errorConfig } from '@configs/errorConfig'
import { CalculateQuoteDTO } from '../dtos/CalculateQuoteDTO'

export class CalculateQuoteUseCase {
  private shippmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shippmentProvider: IShipmentProvider, cache: ICache) {
    this.shippmentProvider = shippmentProvider
    this.cache = cache
  }

  async execute({
    products,
    zipcode,
  }: CalculateQuoteDTO): Promise<ShipmentService[]> {
    if (!zipcode || !products.length)
      throw new AppError('Zipcode or skus are incorrect', 402)

    try {
      const accessToken = await this.cache.get<string>(
        cacheConfig.KEYS.ACCESS_TOKEN,
      )

      if (!accessToken) throw new AppError(errorConfig.AUTH.INVALID_TOKEN, 402)
      return await this.shippmentProvider.calculate(
        { products, zipcode },
        accessToken,
      )
    } catch (error) {
      console.error(error)
      // this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to calculate shipment quotes', 500)
    }
  }
}
