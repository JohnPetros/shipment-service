import { Jwt } from '../../Entities/Jwt'
import { envConfig } from '../../configs/envConfig'
import { IHttpClientProvider } from '../HttpClientProvider/IHttpClientProvider'
import { IShipmentProvider } from './IShipmentProvider'
import queryStrig from 'node:querystring'

const {
  NODE_ENV,
  MELHOR_ENVIO_DEV_URL,
  MELHOR_ENVIO_PROD_URL,
  MELHOR_ENVIO_CLIENT_ID,
  MELHOR_ENVIO_SECRET,
  MELHOR_ENVIO_REDIRECT_URI,
} = envConfig

const BASE_URL =
  NODE_ENV === 'development' || NODE_ENV === 'test'
    ? MELHOR_ENVIO_DEV_URL
    : MELHOR_ENVIO_PROD_URL

type Token = {
  access_token: string
  refresh_token: string
  expires_in: number
}

export class MelhorEnvioShipmentProvider implements IShipmentProvider {
  private responseType = 'code'
  private api: IHttpClientProvider

  constructor(api: IHttpClientProvider) {
    this.api = api

    api.setBaseUrl(String(BASE_URL))
  }

  calculate(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async authorize() {
    const response = await this.api.get(
      `/oauth/authorize?${queryStrig.stringify({
        client_id: MELHOR_ENVIO_CLIENT_ID,
        redirect_uri: MELHOR_ENVIO_REDIRECT_URI,
        response_type: this.responseType,
        scope: 'shipping-calculate',
      })}`,
    )

    console.log(response)
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
      await this.api.post<Token>('/oauth/token', body)

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    }
  }
}