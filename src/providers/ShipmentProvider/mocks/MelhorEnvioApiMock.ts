import { envConfig } from '@configs/envConfig'
import { jwtMock } from '@entities/mocks/jwtMock'
import { http, HttpResponse } from 'msw'
import { MelhorEnvioQuote } from '../MelhorEnvioShipmentProvider'
import { quoteMock } from '@entities/mocks/quoteMock'

const melhorEnvioQuoteMock: MelhorEnvioQuote = {
  id: 1,
  name: quoteMock.name,
  discount: 'discount mock',
  price: quoteMock.price.toString(),
  delivery_time: quoteMock.days,
  custom_price: quoteMock.price.toString(),
  custom_delivery_time: quoteMock.days,
  currency: 'currency mock',
}

export const melhorEnvioApiMock = [
  http.post(`${envConfig.MELHOR_ENVIO_DEV_URL}/oauth/token`, () => {
    return HttpResponse.json({
      access_token: jwtMock.accessToken,
      refresh_token: jwtMock.refreshToken,
      expires_in: jwtMock.expiresIn,
    })
  }),
  http.post(
    `${envConfig.MELHOR_ENVIO_DEV_URL}/api/v2/me/shipment/calculate`,
    () => {
      return HttpResponse.json([melhorEnvioQuoteMock])
    },
  ),
]
