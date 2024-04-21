export interface IEnvConfig {
  PORT: number
  DOMAIN: string | undefined
  NODE_ENV: 'production' | 'development' | 'test' | undefined
  ZIPCODE: number | undefined
  MELHOR_ENVIO_URL: string | undefined
  MELHOR_ENVIO_SECRET: string | undefined
  MELHOR_ENVIO_CLIENT_ID: number
  MELHOR_ENVIO_REDIRECT_URI: string | undefined
  REDIS_PORT: number | undefined
  REDIS_HOST: string | undefined
  REDIS_USERNAME: string | undefined
  REDIS_PASSWORD: string | undefined
  REDIS_URL: string | undefined
}
