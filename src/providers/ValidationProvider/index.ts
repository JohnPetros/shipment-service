import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'
import { IValidationProvider } from './IValidationProvider'
import { ZodValidationProvider } from './ZodValidationProvider'

export class ValidationProvider implements IValidationProvider {
  private validationProvider: IValidationProvider

  constructor() {
    this.validationProvider = new ZodValidationProvider()
  }

  validateEnvConfig(envVars: IEnvConfig) {
    this.validationProvider.validateEnvConfig(envVars)
  }
}
