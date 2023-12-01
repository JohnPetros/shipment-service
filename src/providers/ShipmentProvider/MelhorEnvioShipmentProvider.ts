import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
import { envConfig } from '../../configs/envConfig'
import { CalculateQuotePayload } from '../../controllers/shipment/payloads/CalculateQuotePayload'
import { IShipmentProvider } from './IShipmentProvider'
import queryStrig from 'node:querystring'
import { Quote } from '@entities/Quote'
import { Jwt } from '@entities/Jwt'

const {
  NODE_ENV,
  MELHOR_ENVIO_DEV_URL,
  MELHOR_ENVIO_PROD_URL,
  MELHOR_ENVIO_CLIENT_ID,
  MELHOR_ENVIO_SECRET,
  MELHOR_ENVIO_REDIRECT_URI,
  ZIPCODE,
} = envConfig

const BASE_URL =
  NODE_ENV === 'development' || NODE_ENV === 'test'
    ? MELHOR_ENVIO_DEV_URL
    : MELHOR_ENVIO_PROD_URL

export type MelhorEnvioToken = {
  access_token: string
  refresh_token: string
  expires_in: number
}

export type MelhorEnvioQuote = {
  id: number,
  name: string,
  price: string,
  custom_price: string,
  discount: string,
  currency: string,
  delivery_time: number,
  custom_delivery_time: number,
  error?: string
}

export class MelhorEnvioShipmentProvider implements IShipmentProvider {
  private api: IHttpClientProvider

  constructor(api: IHttpClientProvider) {
    this.api = api

    api.setBaseUrl(String(BASE_URL))
  }

  async calculate(
    { zipcode, skus }: CalculateQuotePayload,
    token: string,
  ): Promise<Quote[]> {
    this.api.setBearerToken(token)

  const quotes = await this.api.post<MelhorEnvioQuote[]>('/api/v2/me/shipment/calculate', {
      from: {
        postal_code: String(zipcode),
      },
      to: {
        postal_code: String(ZIPCODE)
      },
      products: skus.map(sku => ({
        width: sku.width,
        height: sku.height,
        length: sku.length,
        weight: sku.weight,
        insurance_value: sku.price,
        quantity: sku.quantity,
      }))
    })

    return quotes.filter(quote => !Boolean(quote.error)).map(quote => ({
      name: quote.name,
      service: quote.name,
      price: Number(quote.custom_price),
      days: quote.custom_delivery_time,
    }))
  }

  async authorize() {
    const response = await this.api.get(
      `/oauth/authorize?${queryStrig.stringify({
        client_id: MELHOR_ENVIO_CLIENT_ID,
        redirect_uri: MELHOR_ENVIO_REDIRECT_URI,
        response_type: 'code',
        scope: 'shipping-calculate',
      })}`,
    )

    console.log({ response })
  }

  async getToken(code: string): Promise<Jwt> {
    const body = {
      grant_type: 'authorization_code',
      client_id: MELHOR_ENVIO_CLIENT_ID,
      client_secret: MELHOR_ENVIO_SECRET,
      redirect_uri: MELHOR_ENVIO_REDIRECT_URI,
      code,
    }

    const { access_token, refresh_token, expires_in } =
      await this.api.post<MelhorEnvioToken>('/oauth/token', body)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: new Date(expires_in),
    }
  }
}
