import { IUseCase } from 'app/interfaces/IUseCase'

import { PagarmeWebhook } from '@providers/PaymentProvider/PagarmePaymentProvider/types/PagarmeWebhook'
import { IDatabaseProvider } from '@providers/DatabaseProvider/IDatabaseProvider'

import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'
import { IdGenerator } from '@utils/IdGenerator'

export class WebhookUseCase implements IUseCase<PagarmeWebhook, void> {
  private databaseProvider: IDatabaseProvider

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider
  }

  async execute({ customer, items, shipping }: PagarmeWebhook): Promise<void> {
    new Console().log(customer)
    const idGenerator = new IdGenerator()

    const itemsTotalPrice = items.reduce((total, currentItem) => {
      return total + currentItem.amount
    }, 0)

    try {
      this.databaseProvider.saveOrder({
        status: 'paid',
        customer_id: customer.id,
        items: items.map((item) => ({
          price: item.amount,
          product_id: item.id,
          quantity: item.quantity,
          sku_id: item.id,
        })),
        address: {
          id: customer.address.id,
          neighborhood: customer.address.neighborhood,
          number: customer.address.number,
          receiver: customer.name,
          street: customer.address.street,
          zipcode: customer.address.zip_code,
          city: customer.address.city,
          uf: customer.address.state,
        },
        shipment_service: shipping.description,
        value_discount: 0,
        value_products: items.reduce((total, currentItem) => {
          return total + currentItem.amount
        }, 0),
        value_shipment: shipping.amount,
        value_total: itemsTotalPrice,
        number: idGenerator.uuidNumber(15),
        days_delivery: 3,
      })
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to save paid order', 500)
    }
  }
}
