import {
  MercadoPagoConfig,
  Payment as MercadoPagoPayment,
  PaymentMethod as MercadoPagoPaymentMethod,
  Preference as MercadoPagoPreference,
} from 'mercadopago'

import { IPaymentProvider } from './IPaymentProvider'

import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Items } from 'mercadopago/dist/clients/commonTypes'
import { Payer } from 'mercadopago/dist/clients/payment/commonTypes'
import { Payment, PaymentMethod, PaymentStatus } from '@entities/Payment'

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

  async getPayment(paymentId: string): Promise<Payment> {
    const response = await this.payment.get({ id: paymentId })

    const payment: Payment = {
      id: response.id?.toString() ?? '',
      status: (response.status as PaymentStatus) ?? 'pending',
      customer: {
        id: response.payer?.id ?? '',
        email: response.payer?.email ?? '',
      },
      paymentMethod: this.getPaymentMethod(response.payment_type_id ?? ''),
    }

    return payment
  }

  async checkout(customer: Customer, products: Product[]): Promise<string> {
    const items: Items[] = products.map((product) => ({
      id: product.id,
      title: product.name,
      quantity: product.quantity,
      unit_price: product.price,
      currency_id: 'BRL',
    }))

    const payer: Payer = {
      id: customer.id,
      email: customer.email,
    }

    const response = await this.preference.create({
      body: {
        items,
        payer,
        payment_methods: {
          excluded_payment_types: [{ id: 'debit_card' }],
        },
        back_urls: {
          success: `${envConfig.DOMAIN}/payment/success`,
          failure: `${envConfig.DOMAIN}/payment/failure`,
          pending: `${envConfig.DOMAIN}/payment/pending`,
        },
      },
    })

    if (!response.init_point) {
      throw new Error('Failed to get init point url')
    }

    return response.init_point
  }
}
