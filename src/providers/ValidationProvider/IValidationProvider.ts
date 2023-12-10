import { IEnvConfig } from '@configs/interfaces/IEnvConfig'
import { Customer } from '@entities/Customer'

export interface IValidationProvider {
  validateEnvConfig({ PORT, NODE_ENV }: IEnvConfig): void
  validateCustomer(customer: Customer): void
}
