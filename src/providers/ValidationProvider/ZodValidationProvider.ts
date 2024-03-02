import { z } from 'zod'
import { IValidationProvider } from './IValidationProvider'
import { IEnvConfig } from '@configs/interfaces/IEnvConfig'
import { Customer } from '@entities/Customer'
import { regexConfig } from '@configs/regexConfig'
import { AppError } from '@utils/AppError'
import { Product } from '@entities/Product'
import { CreditCard } from '@entities/CreditCard'
import { ShipmentService } from '@entities/ShipmentService'

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
      REDIS_PASSWORD: z.string(),
      REDIS_PORT: z.number(),
      REDIS_EXTERNAL_URL: z.string(),
      REDIS_INTERNAL_URL: z.string(),
      MELHOR_ENVIO_URL: z.string(),
      MELHOR_ENVIO_SECRET: z.string(),
      MELHOR_ENVIO_CLIENT_ID: z.number(),
      MELHOR_ENVIO_REDIRECT_URI: z.string(),
      // MERCADO_PAGO_ACCESS_TOKEN: z.string(),
      // MERCADO_PAGO_PUBLIC_KEY: z.string(),
      // PAGAR_ME_API_URL: z.string(),
      // PAGAR_ME_PUBLIC_KEY: z.string(),
      // PAGAR_ME_SECRET_KEY: z.string(),
      // YAMPI_BASE_URL: z.string(),
      // YAMPI_SECRET_KEY: z.string(),
      // YAMPI_TOKEN: z.string(),
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
        'Customer data is invalid. Error: ' +
        this.getErrorsMessage(validation.error.formErrors.fieldErrors),
        400,
      )
    }
  }

  validateProduct(product: Product) {
    const productSchema = z.object({
      id: z.string({
        required_error: 'Id is required',
      }),
      name: z.string({
        required_error: 'Id is required',
      }),
      sku: z.string({
        required_error: 'Id is required',
      }),
      quantity: z.number({
        required_error: 'Quantity must be number',
      }),
      price: z.number({
        required_error: 'Price must be number',
      }),
      length: z.number({
        required_error: 'Length must be number',
      }),
      width: z.number({
        required_error: 'Width must be number',
      }),
      height: z.number({
        required_error: 'Height must be number',
      }),
      weight: z.number({
        required_error: 'Weight must be number',
      }),
    })

    const validation = productSchema.safeParse(product)

    if (!validation.success) {
      throw new AppError(
        'Product data is invalid. Error: ' +
        this.getErrorsMessage(validation.error.formErrors.fieldErrors),
        400,
      )
    }
  }

  validateShipmentService(shipmentService: ShipmentService) {
    const shipmentServiceSchema = z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      service: z.string({
        required_error: 'Service is required',
      }),
      price: z.number({
        required_error: 'Price must be number',
      }),
      days: z.number({
        required_error: 'Days must be number',
      }),
    })

    const validation = shipmentServiceSchema.safeParse(shipmentService)

    if (!validation.success) {
      throw new AppError(
        'Shipment service data is invalid. Error: ' +
        this.getErrorsMessage(validation.error.formErrors.fieldErrors),
        400,
      )
    }
  }

  validateCreditCard(product: CreditCard) {
    const creditSchema = z.object({
      holderName: z
        .string({
          required_error: 'Holder name is required',
        })
        .regex(
          regexConfig.FULL_NAME,
          'Credit card holder name must be full name',
        ),
      number: z
        .string({
          required_error: 'Credit card is required',
        })
        .length(16, 'Credit card number must contain exactly 16 characters')
        .regex(regexConfig.NUMERIC, 'Credit card number must be numeric'),
      expirationDate: z
        .string()
        .regex(
          regexConfig['MM/YY'],
          'Credit card expiration date must be in mm/yy format',
        ),
      cvv: z
        .string()
        .regex(regexConfig.NUMERIC, 'Credit card cvv must be numeric')
        .length(3, 'Credit card cvv must contain exactly 3 characters'),
    })

    const validation = creditSchema.safeParse(product)

    if (!validation.success) {
      throw new AppError(
        'Credit card data is invalid. Error: ' +
        this.getErrorsMessage(validation.error.formErrors.fieldErrors),
        400,
      )
    }
  }
}
