import { Quote } from '../../../entities/Quote'
import { CalculateQuotePayload } from '../../../controllers/shipment/payloads/CalculateQuotePayload'
import { IShipmentProvider } from '../../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../../utils/AppError'
import { ICache } from '@cache/ICache'
import { cachConfig } from '@configs/cacheConfig'
import { appConfig } from '@configs/appConfig'

export class CalculateQuoteUseCase {
  private shippmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shippmentProvider: IShipmentProvider, cache: ICache) {
    this.shippmentProvider = shippmentProvider
    this.cache = cache
  }

  async execute({ skus, zipcode }: CalculateQuotePayload): Promise<Quote[]> {
    if (!zipcode || !skus.length)
      throw new AppError('Zipcode or skus are incorrect', 402)

    const accessToken = await this.cache.get<string>(
      cachConfig.KEYS.ACCESS_TOKEN,
    )

    if (!accessToken) throw new AppError(appConfig.ERRORS.INVALID_TOKEN, 402)

    try {
      return await this.shippmentProvider.calculate(
        { skus, zipcode },
        accessToken,
      )
    } catch (error) {
      console.error(error)
      this.shippmentProvider.handleApiError(error)
      throw new AppError('Failed to calculate quotes', 500)
    }
  }
}
