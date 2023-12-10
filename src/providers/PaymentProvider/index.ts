import { PaymentMethod } from '@entities/PaymentMethod'
import { IPaymentProvider } from './IPaymentProvider'
import { MercadoPagoPaymentProvider } from './MercadoPagoPaymentProvider'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'

export class PaymentProvider implements IPaymentProvider {
  private paymentProvider: IPaymentProvider

  constructor() {
    this.paymentProvider = new MercadoPagoPaymentProvider()
  }

  async checkout(customer: Customer, products: Product[]): Promise<string> {
    return await this.paymentProvider.checkout(customer, products)
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.paymentProvider.getPaymentMethods()
  }
}
