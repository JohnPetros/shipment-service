import { z } from 'zod'
import { IValidationProvider } from './IValidationProvider'
import { IEnvConfig } from '../../configs/interfaces/IEnvConfig'
import { AppError } from '../../utils/AppError'

export class ZodValidationProvider implements IValidationProvider {
  validateEnvConfig({ NODE_ENV, PORT }: IEnvConfig) {
    const envConfigSchema = z.object({
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
      PORT: z.number().default(3333),
    })

    const validation = envConfigSchema.safeParse({ NODE_ENV, PORT })

    if (!validation.success) {
      console.error(validation.error.format())
      throw new AppError('Invalid env variables', 500)
    }
  }
}
