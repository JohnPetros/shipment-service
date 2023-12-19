import { IEnvConfig } from '@configs/interfaces/IEnvConfig'
import { CreditCard } from '@entities/CreditCard'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { ShipmentService } from '@entities/ShipmentService'

export interface IValidationProvider {
  validateEnvConfig({ PORT, NODE_ENV }: IEnvConfig): void
  validateCustomer(customer: Customer): void
  validateProduct(product: Product): void
  validateShipmentService(shipmentService: ShipmentService): void
  validateCreditCard(creditCard: CreditCard): void
}
