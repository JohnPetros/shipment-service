import { IEnvConfig } from './interfaces/IEnvConfig'
import 'dotenv/config'
import { ZodValidationProvider } from '@providers/ValidationProvider/ZodValidationProvider'

const _envConfig: IEnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,
  PORT: Number(process.env.PORT) ?? 3333,
  ZIPCODE: Number(process.env.ZIPCODE),
  ALIAS: process.env.ALIAS,
  MELHOR_ENVIO_DEV_URL: process.env.MELHOR_ENVIO_DEV_URL,
  MELHOR_ENVIO_PROD_URL: process.env.MELHOR_ENVIO_PROD_URL,
  MELHOR_ENVIO_CLIENT_ID: Number(process.env.MELHOR_ENVIO_CLIENT_ID),
  MELHOR_ENVIO_SECRET: process.env.MELHOR_ENVIO_SECRET,
  MELHOR_ENVIO_REDIRECT_URI: process.env.MELHOR_ENVIO_REDIRECT_URI,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_INTERNAL_URL: process.env.REDIS_INTERNAL_URL,
  REDIS_EXTERNAL_URL: process.env.REDIS_EXTERNAL_URL,
  MERCADO_PAGO_PUBLIC_KEY: process.env.MERCADO_PAGO_PUBLIC_KEY,
  MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  PAGAR_ME_PUBLIC_KEY: process.env.PAGAR_ME_PUBLIC_KEY,
  PAGAR_ME_SECRET_KEY: process.env.PAGAR_ME_SECRET_KEY,
  PAGAR_ME_API_URL: process.env.PAGAR_ME_API_URL,
  YAMPI_BASE_URL: process.env.YAMPI_BASE_URL,
  YAMPI_SECRET_KEY: process.env.YAMPI_SECRET_KEY,
  YAMPI_TOKEN: process.env.YAMPI_TOKEN,
}

console.log({ _envConfig })

const zodValidationProvider = new ZodValidationProvider()

zodValidationProvider.validateEnvConfig(_envConfig)

export const envConfig = _envConfig
