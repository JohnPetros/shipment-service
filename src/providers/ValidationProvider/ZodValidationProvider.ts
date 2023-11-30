import { z } from 'zod'
import { IValidationProvider } from './IValidationProvider'
import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'
import { AppError } from '../../utils/AppError'

export class ZodValidationProvider implements IValidationProvider {
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
  }: IEnvConfig) {
    const envConfigSchema = z.object({
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
      DOMAIN: z.string(),
      ZIPCODE: z.number(),
      PORT: z.number().default(3333),
      MELHOR_ENVIO_DEV_URL: z.string(),
      MELHOR_ENVIO_PROD_URL: z.string(),
    })

    const validation = envConfigSchema.safeParse({
      PORT,
      NODE_ENV,
      DOMAIN,
      ZIPCODE,
      MELHOR_ENVIO_DEV_URL,
      MELHOR_ENVIO_PROD_URL,
      MELHOR_ENVIO_CLIENT_ID,
      MELHOR_ENVIO_REDIRECT_URI,
      MELHOR_ENVIO_SECRET,
    })

    if (!validation.success) {
      console.error(validation.error.format())
      throw new AppError('Invalid env variables', 500)
    }
  }
}
