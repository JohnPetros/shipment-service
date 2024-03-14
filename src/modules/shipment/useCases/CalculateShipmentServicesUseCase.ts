import { ShipmentService } from '@entities/ShipmentService'

import { IShipmentProvider } from '@providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '@utils/AppError'
import { ICache } from '@cache/ICache'
import { cacheConfig } from '@configs/cacheConfig'
import { errorConfig } from '@configs/errorConfig'
import { CalculateShipmentServicesDTO } from '../dtos/CalculateShipmentServicesDTO'
import { IUseCase } from 'app/interfaces/IUseCase'

export class CalculateShipmentServicesUseCase
  implements IUseCase<CalculateShipmentServicesDTO, ShipmentService[]>
{
  private shipmentProvider: IShipmentProvider
  private cache: ICache

  constructor(shipmentProvider: IShipmentProvider, cache: ICache) {
    this.shipmentProvider = shipmentProvider
    this.cache = cache
  }

  async execute({
    products,
    zipcode,
  }: CalculateShipmentServicesDTO): Promise<ShipmentService[]> {
    if (!zipcode || !products.length)
      throw new AppError('Zipcode or products are incorrect', 402)

    const accessToken = await this.cache.get(cacheConfig.KEYS.ACCESS_TOKEN)

    if (!accessToken) throw new AppError(errorConfig.AUTH.INVALID_TOKEN, 402)

    try {
      const shipmentServices = await this.shipmentProvider.calculate(
        { products, zipcode },
        accessToken
      )

      return shipmentServices.sort((a, b) => (a.price > b.price ? 1 : -1))
    } catch (error) {
      console.error(error)
      this.shipmentProvider.handleApiError(error)
      throw new AppError('Failed to calculate shipment quotes', 500)
    }
  }
}
