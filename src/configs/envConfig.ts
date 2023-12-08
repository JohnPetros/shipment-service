import { ValidationProvider } from '@providers/ValidationProvider'
import { IEnvConfig } from './interfaces/IEnvConfig'
import 'dotenv/config'

const _envConfig: IEnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,
  PORT: Number(process.env.PORT) ?? 3333,
  ZIPCODE: Number(process.env.ZIPCODE),
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
}

console.log({ _envConfig })

const validationProvider = new ValidationProvider()

validationProvider.validateEnvConfig(_envConfig)

export const envConfig = _envConfig
