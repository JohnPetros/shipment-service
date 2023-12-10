import {
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
  Preference,
} from 'mercadopago'

import { IPaymentProvider } from './IPaymentProvider'

import { PaymentMethod as PaymentMethodResponse } from '@entities/PaymentMethod'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Items } from 'mercadopago/dist/clients/commonTypes'
import { Payer } from 'mercadopago/dist/clients/payment/commonTypes'

const ACCESS_TOKEN = envConfig.MERCADO_PAGO_ACCESS_TOKEN

export class MercadoPagoPaymentProvider implements IPaymentProvider {
  private payment: Payment
  private paymentMethod: PaymentMethod
  private preference: Preference

  constructor() {
    if (!ACCESS_TOKEN)
      throw new AppError('Mercado Pago access token is not provided', 500)

    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000, idempotencyKey: 'abc' },
    })

    this.payment = new Payment(client)
    this.paymentMethod = new PaymentMethod(client)
    this.preference = new Preference(client)
  }

  async getPaymentMethods(): Promise<PaymentMethodResponse[]> {
    const paymentMethods = await this.paymentMethod.get()

    new Console().log(paymentMethods[0])

    return paymentMethods.map((paymentMethod) => ({
      id: paymentMethod.id ?? '',
      name: paymentMethod.thumbnail ?? '',
      maxAllowedAmount: Number(paymentMethod.max_allowed_amount),
      minAllowedAmount: Number(paymentMethod.min_allowed_amount),
      type: paymentMethod.payment_type_id ?? '',
      image: paymentMethod.thumbnail ?? '',
    }))
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
        back_urls: {
          success: `${envConfig.DOMAIN}/payment/success`,
          failure: `${envConfig.DOMAIN}/payment/failure`,
          pending: `${envConfig.DOMAIN}/payment/pending`,
        },
      },
    })

    new Console().log(response)

    if (!response.init_point) {
      throw new Error('Failed to get init point url')
    }

    return response.init_point
  }
}
