import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'
import { IValidationProvider } from './IValidationProvider'
import { ZodValidationProvider } from './ZodValidationProvider'

export class ValidationProvider implements IValidationProvider {
  private validationProvider: IValidationProvider

  constructor() {
    this.validationProvider = new ZodValidationProvider()
  }

  validateEnvConfig({
    PORT,
    NODE_ENV,
    DOMAIN,
    ZIPCODE,
    MELHOR_ENVIO_DEV_URL,
    MELHOR_ENVIO_PROD_URL,
    MELHOR_ENVIO_CLIENT_ID,
    MELHOR_ENVIO_REDIRECT_URI,
    MELHOR_ENVIO_SECRET,
    REDIS_PASSWORD,
    REDIS_PORT,
  }: IEnvConfig) {
    this.validationProvider.validateEnvConfig({
      PORT,
      NODE_ENV,
      DOMAIN,
      ZIPCODE,
      MELHOR_ENVIO_DEV_URL,
      MELHOR_ENVIO_PROD_URL,
      MELHOR_ENVIO_CLIENT_ID,
      MELHOR_ENVIO_REDIRECT_URI,
      MELHOR_ENVIO_SECRET,
      REDIS_PASSWORD,
      REDIS_PORT,
    })
  }
}
