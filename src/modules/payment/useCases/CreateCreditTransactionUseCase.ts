import { IUseCase } from '@http/interfaces/IUseCase'

import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { IValidationProvider } from '@providers/ValidationProvider/IValidationProvider'

import { AppError } from '@utils/AppError'
import { CreateCreditCardTransactionDTO } from '../dtos/CreateTransactionDTO'
import { Transaction } from '@entities/Transaction'
import { Console } from '@utils/Console'

export class CreateCreditTransactionUseCase
  implements IUseCase<CreateCreditCardTransactionDTO, Transaction>
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
    products,
    total,
    creditCard,
  }: CreateCreditCardTransactionDTO): Promise<Transaction> {
    if (!customer) throw new AppError('Customer data is not provided', 400)
    if (!products.length)
      throw new AppError('Products data is not provided', 400)
    if (!total) throw new AppError('Total is not provided', 400)

    this.validationProvider.validateCustomer(customer)

    try {
      return await this.paymentProvider.createCreditCardTransaction({
        creditCard,
        customer,
        products,
        total,
      })
    } catch (error) {
      this.paymentProvider.handleApiError(error)
      throw new AppError('Failed to create credit card transaction', 500)
    }
  }
}
