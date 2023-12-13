import {
  MercadoPagoConfig,
  Payment as MercadoPagoPayment,
  PaymentMethod as MercadoPagoPaymentMethod,
  Preference as MercadoPagoPreference,
} from 'mercadopago'

import { IPaymentProvider } from './IPaymentProvider'

import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import { PaymentMethod } from '@entities/PaymentMethod'
import { Transaction } from '@entities/Transaction'
import { CreateTransactionDTO } from '../../modules/payment/dtos/CreateTransactionDTO'

const ACCESS_TOKEN = envConfig.MERCADO_PAGO_ACCESS_TOKEN

export class MercadoPagoPaymentProvider implements IPaymentProvider {
  private payment: MercadoPagoPayment
  private paymentMethod: MercadoPagoPaymentMethod
  private preference: MercadoPagoPreference

  constructor() {
    if (!ACCESS_TOKEN)
      throw new AppError('Mercado Pago access token is not provided', 500)

    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000, idempotencyKey: 'abc' },
    })

    this.payment = new MercadoPagoPayment(client)
    this.paymentMethod = new MercadoPagoPaymentMethod(client)
    this.preference = new MercadoPagoPreference(client)
  }

  createTicketTransaction({
    customer,
    products,
  }: CreateTransactionDTO): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }

  handleApiError(error: unknown): void {
    if (error) throw new AppError('Api error')
  }

  async createCreditCardTransaction(
    payload: CreateTransactionDTO,
  ): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }

  private getPaymentMethod(mercadoPagoPaymentType: string): PaymentMethod {
    switch (mercadoPagoPaymentType) {
      case 'credit_card':
        return 'credit-card'
      case 'ticket':
        return 'ticket'
      case 'bank_transfer':
        return 'pix'
      default:
        return 'credit-card'
    }
  }
}
