import { PaymentMethod } from '@entities/PaymentMethod'
import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { AppError } from '@utils/AppError'

export class GetPaymentMethodsUseCase {
  private paymentProvider: IPaymentProvider

  constructor(paymentProvider: IPaymentProvider) {
    this.paymentProvider = paymentProvider
  }

  async execute(): Promise<PaymentMethod[]> {
    try {
      return await this.paymentProvider.getPaymentMethods()
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to get payment methods', 500)
    }
  }
}
