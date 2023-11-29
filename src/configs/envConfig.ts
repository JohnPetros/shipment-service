import { ValidationProvider } from '../providers/ValidationProvider'
import { IEnvConfig } from './interfaces/IEnvConfig'

const validationProvider = new ValidationProvider()

const _envConfig: IEnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) ?? 3333,
}

validationProvider.validateEnvConfig(_envConfig)

export const envConfig = _envConfig
