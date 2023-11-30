import { Quote } from '../../Entities/Quote'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'
import { IShipmentProvider } from '../../providers/ShipmentProvider/IShipmentProvider'
import { AppError } from '../../utils/AppError'

export class CalculateQuoteUseCase {
  private shippmentProvider: IShipmentProvider

  constructor(shippmentProvider: IShipmentProvider) {
    this.shippmentProvider = shippmentProvider
  }

  async execute(
    { skus, zipcode }: CalculateQuotePayload,
    token: string,
  ): Promise<Quote[]> {
    if (!zipcode || !skus.length)
      throw new AppError('Zipcode or skus are incorrect', 402)

    try {
      return await this.shippmentProvider.calculate({ skus, zipcode }, token)
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to calculate quotes', 500)
    }
  }
}
