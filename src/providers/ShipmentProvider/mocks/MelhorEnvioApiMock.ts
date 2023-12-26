import { envConfig } from '@configs/envConfig'
import { jwtMock } from '@entities/mocks/jwtMock'
import { http, HttpResponse } from 'msw'
import { MelhorEnvioQuote } from '../MelhorEnvioShipmentProvider'
import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'

const melhorEnvioShipmentServiceMock: MelhorEnvioQuote = {
  id: 1,
  name: shipmentServiceMock.name,
  discount: 'discount mock',
  price: shipmentServiceMock.price.toString(),
  delivery_time: shipmentServiceMock.days,
  custom_price: shipmentServiceMock.price.toString(),
  custom_delivery_time: shipmentServiceMock.days,
  currency: 'currency mock',
}

export const melhorEnvioApiMock = [
  http.post(`${envConfig.MELHOR_ENVIO_DEV_URL}/oauth/token`, () => {
    return HttpResponse.json({
      access_token: jwtMock.accessToken,
      refresh_token: jwtMock.refreshToken,
    })
  }),
  http.post(
    `${envConfig.MELHOR_ENVIO_DEV_URL}/api/v2/me/shipment/calculate`,
    () => {
      return HttpResponse.json([melhorEnvioShipmentServiceMock])
    },
  ),
]
