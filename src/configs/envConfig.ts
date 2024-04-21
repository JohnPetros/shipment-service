import { IEnvConfig } from './interfaces/IEnvConfig'
import 'dotenv/config'
import { ZodValidationProvider } from '@providers/ValidationProvider/ZodValidationProvider'

type NodeEnv = 'production' | 'development' | 'test'

const isTestEnv = process.env.NODE_ENV

let _envConfig: IEnvConfig | null = null

if (isTestEnv) {
  _envConfig = {
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
    DOMAIN: process.env.VITE_DOMAIN,
    PORT: Number(process.env.VITE_PORT) ?? 3333,
    ZIPCODE: Number(process.env.VITE_ZIPCODE),
    MELHOR_ENVIO_URL: process.env.VITE_MELHOR_ENVIO_URL,
    MELHOR_ENVIO_CLIENT_ID: Number(process.env.VITE_MELHOR_ENVIO_CLIENT_ID),
    MELHOR_ENVIO_SECRET: process.env.VITE_MELHOR_ENVIO_SECRET,
    MELHOR_ENVIO_REDIRECT_URI: process.env.VITE_MELHOR_ENVIO_REDIRECT_URI,
    REDIS_PORT: Number(process.env.VITE_REDIS_PORT),
    REDIS_HOST: process.env.VITE_REDIS_HOST,
    REDIS_USERNAME: process.env.VITE_REDIS_USERNAME,
    REDIS_PASSWORD: process.env.VITE_REDIS_PASSWORD,
    REDIS_URL: process.env.VITE_REDIS_URL,
  }
} else {
  _envConfig = {
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
    DOMAIN: process.env.DOMAIN,
    PORT: Number(process.env.PORT) ?? 3333,
    ZIPCODE: Number(process.env.ZIPCODE),
    MELHOR_ENVIO_URL: process.env.MELHOR_ENVIO_URL,
    MELHOR_ENVIO_CLIENT_ID: Number(process.env.MELHOR_ENVIO_CLIENT_ID),
    MELHOR_ENVIO_SECRET: process.env.MELHOR_ENVIO_SECRET,
    MELHOR_ENVIO_REDIRECT_URI: process.env.MELHOR_ENVIO_REDIRECT_URI,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_URL: process.env.REDIS_URL,
  }
}

const zodValidationProvider = new ZodValidationProvider()

zodValidationProvider.validateEnvConfig(_envConfig)

console.log(_envConfig)

export const envConfig = _envConfig
