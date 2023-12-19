import { Customer } from '@entities/Customer'
import { PaymentMethod } from '@entities/PaymentMethod'
import { Product } from '@entities/Product'
import { ShipmentService } from '@entities/ShipmentService'

export interface CreateTransactionDTO {
  customer: Customer
  products: Product[]
  shipmentService: ShipmentService
  cardToken?: string
  paymentMethod: PaymentMethod
}
