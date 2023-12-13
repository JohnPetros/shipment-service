import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO'

import { IUseCase } from '@http/interfaces/IUseCase'

import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { IValidationProvider } from '@providers/ValidationProvider/IValidationProvider'

import { Transaction } from '@entities/Transaction'

import { AppError } from '@utils/AppError'

export class CreateTransactionUseCase
  implements IUseCase<CreateTransactionDTO, Transaction | undefined>
{
  private paymentProvider: IPaymentProvider
  private validationProvider: IValidationProvider

  constructor(
    paymentProvider: IPaymentProvider,
    validationProvider: IValidationProvider,
  ) {
    this.paymentProvider = paymentProvider
    this.validationProvider = validationProvider
  }

  async execute({
    customer,
    creditCard,
    products,
    paymentMethod,
  }: CreateTransactionDTO): Promise<Transaction | undefined> {
    if (!customer) throw new AppError('Customer data is not provided', 400)
    if (!products.length)
      throw new AppError('Products data is not provided', 400)

    this.validationProvider.validateCustomer(customer)

    for (const product of products)
      this.validationProvider.validateProduct(product)

    try {
      switch (paymentMethod) {
        case 'credit-card':
          if (!creditCard)
            throw new AppError('Customer data is not provided', 400)
          this.validationProvider.validateCreditCard(creditCard)

          return await this.paymentProvider.createCreditCardTransaction({
            customer,
            products,
            creditCard,
          })
        case 'ticket':
          return await this.paymentProvider.createTicketTransaction({
            customer,
            products,
          })
        case 'pix':
          return await this.paymentProvider.createPixTransaction({
            customer,
            products,
          })
        default:
          throw new AppError('Payment method is not provided', 400)
      }
    } catch (error) {
      this.paymentProvider.handleApiError(error)
    }
  }
}
