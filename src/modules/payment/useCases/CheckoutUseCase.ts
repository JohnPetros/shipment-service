import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { IValidationProvider } from '@providers/ValidationProvider/IValidationProvider'
import { AppError } from '@utils/AppError'

export class CheckoutUseCase {
  private paymentProvider: IPaymentProvider
  private validationProvider: IValidationProvider

  constructor(
    paymentProvider: IPaymentProvider,
    validationProvider: IValidationProvider,
  ) {
    this.paymentProvider = paymentProvider
    this.validationProvider = validationProvider
  }

  async execute(customer: Customer, products: Product[]): Promise<string> {
    if (!customer) throw new AppError('Customer data is not provided', 400)
    if (!products.length)
      throw new AppError('Products data is not provided', 400)

    this.validationProvider.validateCustomer(customer)

    try {
      return await this.paymentProvider.checkout(customer, products)
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to checkout', 500)
    }
  }
}
