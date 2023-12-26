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
    cardToken,
    products,
    shipmentService,
    paymentMethod,
  }: CreateTransactionDTO): Promise<Transaction | undefined> {
    this.validationProvider.validateCustomer(customer)
    this.validationProvider.validateShipmentService(shipmentService)

    for (const product of products)
      this.validationProvider.validateProduct(product)

    try {
      switch (paymentMethod) {
        case 'credit-card':
          if (!cardToken)
            throw new AppError('credit card token is not provided', 400)

          return await this.paymentProvider.createCreditCardTransaction({
            customer,
            products,
            cardToken,
            shipmentService,
          })
        case 'ticket':
          return await this.paymentProvider.createTicketTransaction({
            customer,
            products,
            shipmentService,
          })
        case 'pix':
          return await this.paymentProvider.createPixTransaction({
            customer,
            products,
            shipmentService,
          })
        default:
          throw new AppError('Payment method is not provided', 400)
      }
    } catch (error) {
      this.paymentProvider.handleApiError(error)
    }
  }
}
