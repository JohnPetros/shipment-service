import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'
import { IValidationProvider } from './IValidationProvider'
import { ZodValidationProvider } from './ZodValidationProvider'

export class ValidationProvider implements IValidationProvider {
  private validationProvider: IValidationProvider

  constructor() {
    this.validationProvider = new ZodValidationProvider()
  }

  validateEnvConfig({ PORT, NODE_ENV }: IEnvConfig) {
    this.validationProvider.validateEnvConfig({ PORT, NODE_ENV })
  }
}
