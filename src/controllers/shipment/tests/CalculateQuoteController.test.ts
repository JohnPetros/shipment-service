import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { apiServerMock } from '@providers/HttpClientProvider/mocks/httpServerMock'
import request from 'supertest'
import { app } from 'app'
import { quoteMock } from '@entities/mocks/quoteMock'

async function getCookies() {
  const callback = await request(app.getServer()).get(
    '/auth/callback?code="code-mock"',
  )
  return callback.get('Set-Cookie')
}

describe('Calculate Quote Controller', () => {
  beforeAll(async () => {
    await app.waitServerAvailability()
    apiServerMock.listen()
  })
  afterEach(() => apiServerMock.resetHandlers())
  afterAll(async () => {
    await app.closeServer()
    apiServerMock.close()
  })

  it('should be able to calculate quote', async () => {
    const cookies = await getCookies()

    const response = await request(app.getServer())
      .post('/shipment/calculate')
      .send({
        zipcode: '12231440',
        amount: 120.0,
        skus: [
          {
            id: 1231233,
            product_id: 12313,
            sku: '716237816313213',
            price: 12.0,
            quantity: 2,
            length: 1,
            width: 1,
            height: 1,
            weight: 1,
            availability_days: 1,
            platform: {
              name: 'shopify',
              external_id: 1231231231313,
            },
          },
        ],
      })
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body).toEqual(expect.objectContaining([quoteMock]))
  })
})
