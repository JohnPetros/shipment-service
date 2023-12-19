export interface IEnvConfig {
  PORT: number
  DOMAIN: string | undefined
  NODE_ENV: string | undefined
  ZIPCODE: number | undefined
  ALIAS:  string | undefined
  MELHOR_ENVIO_DEV_URL: string | undefined
  MELHOR_ENVIO_PROD_URL: string | undefined
  MELHOR_ENVIO_SECRET: string | undefined
  MELHOR_ENVIO_CLIENT_ID: number
  MELHOR_ENVIO_REDIRECT_URI: string | undefined
  REDIS_PORT: number | undefined
  REDIS_PASSWORD: string | undefined
  REDIS_INTERNAL_URL: string | undefined
  REDIS_EXTERNAL_URL: string | undefined
  MERCADO_PAGO_PUBLIC_KEY: string | undefined
  MERCADO_PAGO_ACCESS_TOKEN: string | undefined
  PAGAR_ME_API_URL: string | undefined
  PAGAR_ME_PUBLIC_KEY: string | undefined
  YAMPI_BASE_URL: string | undefined
  YAMPI_TOKEN: string | undefined
  YAMPI_SECRET_KEY: string | undefined
}
