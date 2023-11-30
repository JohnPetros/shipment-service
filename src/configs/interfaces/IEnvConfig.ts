export interface IEnvConfig {
  PORT: number
  NODE_ENV: string | undefined
  MELHOR_ENVIO_DEV_URL: string | undefined
  MELHOR_ENVIO_PROD_URL: string | undefined
  MELHOR_ENVIO_SECRET: string | undefined
  MELHOR_ENVIO_CLIENT_ID: number
  MELHOR_ENVIO_REDIRECT_URI: string | undefined
}
