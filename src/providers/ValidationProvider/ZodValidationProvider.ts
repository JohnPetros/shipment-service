import { z } from 'zod'
import { IValidationProvider } from './IValidationProvider'
import { IEnvConfig } from '@configs/interfaces/IEnvConfig'

export class ZodValidationProvider implements IValidationProvider {
  validateEnvConfig(envVars: IEnvConfig) {
    const envConfigSchema = z.object({
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
      DOMAIN: z.string(),
      ZIPCODE: z.number(),
      PORT: z.number().default(3333),
      MELHOR_ENVIO_DEV_URL: z.string(),
      MELHOR_ENVIO_PROD_URL: z.string(),
      REDIS_PASSWORD: z.string(),
      REDIS_PORT: z.number(),
      REDIS_EXTERNAL_URL: z.string(),
      REDIS_INTERNAL_URL: z.string(),
      MERCADO_PAGO_ACCESS_TOKEN: z.string(),
      MERCADO_PAGO_PUBLIC_KEY: z.string(),
    })

    const validation = envConfigSchema.safeParse(envVars)

    console.log(validation.success)

    if (!validation.success) {
      console.error(validation.error.format())
      throw new Error('Invalid env variables')
    }
  }
}
