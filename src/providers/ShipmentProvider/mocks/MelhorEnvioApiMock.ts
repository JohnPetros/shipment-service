import { envConfig } from '@configs/envConfig'
import { http, HttpResponse } from 'msw'

export const melhorEnvioApiMock = [
  http.post(`${envConfig.MELHOR_ENVIO_DEV_URL}/oauth/token`, () => {
    return HttpResponse.json(
      {
        access_token: 'access token mock',
        refresh_token: 'refresh token mock',
        expires_in: 4242,
      },
    )
  })
]