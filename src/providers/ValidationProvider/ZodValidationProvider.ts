import { z } from 'zod'
import { IValidationProvider } from './IValidationProvider'
import { IEnvConfig } from '@configs/interfaces/IEnvConfig'
import { Customer } from '@entities/Customer'
import { regexConfig } from '@configs/regexConfig'
import { AppError } from '@utils/AppError'

export class ZodValidationProvider implements IValidationProvider {
  private getErrorsMessage(errors: Record<string, string[]>) {
    const errorMessages = []

    for (const error in errors) {
      errorMessages.push(errors[error].join(', '))
    }

    return errorMessages.join(', ')
  }

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

    if (!validation.success) {
      console.error(validation.error.format())
      throw new AppError('Invalid env variables')
    }
  }

  validateCustomer(customer: Customer) {
    const emailSchema = z
      .string({
        required_error: 'Email is required',
      })
      .regex(regexConfig.EMAIL, 'Email is invalid')

    const customerSchema = z.object({
      id: z.string({
        required_error: 'Id is required',
      }),
      email: emailSchema,
    })

    const validation = customerSchema.safeParse(customer)

    if (!validation.success) {
      throw new AppError(
        'customer data is invalid. Error: ' +
          this.getErrorsMessage(validation.error.formErrors.fieldErrors),
      )
    }
  }
}
