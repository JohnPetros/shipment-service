import { IEnvConfig } from '@configs/interfaces/IEnvConfig'
import { CreditCard } from '@entities/CreditCard'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'

export interface IValidationProvider {
  validateEnvConfig({ PORT, NODE_ENV }: IEnvConfig): void
  validateCustomer(customer: Customer): void
  validateProduct(product: Product): void
  validateCreditCard(creditCard: CreditCard): void
}
