import { ShipmentService } from '@entities/ShipmentService'
import { Jwt } from '@entities/Jwt'

import { errorConfig } from '@configs/errorConfig'
import { envConfig } from '@configs/envConfig'

import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'

import { CalculateShipmentServicesDTO } from '@modules/shipment/dtos/CalculateShipmentServicesDTO'

import { AppError } from '@utils/AppError'

import { MelhorEnvioQuote } from './types/MelhorEnvioQuote'
import { MelhorEnvioToken } from './types/MelhorEnvioToken'
import { IShipmentProvider } from '../IShipmentProvider'

const {
  DOMAIN,
  MELHOR_ENVIO_CLIENT_ID,
  MELHOR_ENVIO_SECRET,
  MELHOR_ENVIO_URL,
  MELHOR_ENVIO_REDIRECT_URI,
  ZIPCODE,
} = envConfig

export class MelhorEnvioShipmentProvider implements IShipmentProvider {
  private api: IHttpClientProvider

  constructor(api: IHttpClientProvider) {
    this.api = api

    if (!MELHOR_ENVIO_URL) throw new AppError('MELHOR ENVIO URL is not provided')

    api.setBaseUrl(MELHOR_ENVIO_URL)
  }

  async calculate(
    { zipcode, products }: CalculateShipmentServicesDTO,
    token: string
  ): Promise<ShipmentService[]> {
    this.api.setJwt(`Bearer ${token}`)

    const quotes = await this.api.post<MelhorEnvioQuote[]>(
      '/api/v2/me/shipment/calculate',
      {
        from: {
          postal_code: String(zipcode),
        },
        to: {
          postal_code: String(ZIPCODE),
        },
        products: products.map((product) => ({
          width: product.width,
          height: product.height,
          length: product.length,
          weight: product.weight,
          insurance_value: product.price,
          quantity: product.quantity,
        })),
      }
    )

    return quotes
      .filter((quote) => !quote.error)
      .map((quote) => ({
        name: quote.name,
        service: quote.name,
        price: Number(quote.custom_price),
        days: quote.custom_delivery_time,
      }))
  }

  async authorize() {
    const uri = `/oauth/authorize?client_id=${MELHOR_ENVIO_CLIENT_ID}&redirect_uri=${`${DOMAIN}${MELHOR_ENVIO_REDIRECT_URI}`}&response_type=code&scope=shipping-calculate`

    return `${MELHOR_ENVIO_URL}${uri}`
  }

  async getToken(code: string): Promise<Jwt> {


    const body = {
      grant_type: 'authorization_code',
      client_id: MELHOR_ENVIO_CLIENT_ID,
      client_secret: MELHOR_ENVIO_SECRET,
      redirect_uri: `${DOMAIN}${MELHOR_ENVIO_REDIRECT_URI}`,
      code,
    }

    const { access_token, refresh_token } = await this.api.post<MelhorEnvioToken>(
      '/oauth/token',
      body
    )

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    }
  }

  async refreshToken(refreshToken: string) {
    const body = {
      grant_type: 'refresh_token',
      client_id: MELHOR_ENVIO_CLIENT_ID,
      client_secret: MELHOR_ENVIO_SECRET,
      refresh_token: refreshToken,
    }

    const { access_token, refresh_token, expires_in } =
      await this.api.post<MelhorEnvioToken>('/oauth/token', body)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    }
  }

  handleApiError(error: unknown): void {
    const { message } = this.api.getResponseError<{ message: string }>(error)
    console.error({ error })

    if (message === 'Unauthenticated.') {
      throw new AppError(errorConfig.AUTH.INVALID_TOKEN, 401)
    }
  }
}
