import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from 'app'
import { productsMock } from '@entities/mocks/productsMock'

describe('Calculate Shipment Services Controller', () => {
  beforeAll(async () => {
    await app.waitServerAvailability()
  })
  afterAll(async () => {
    await app.stopServer()
  })

  it('should not be able to calculate shipment services if zipcode or products are invalid', async () => {
    await request(app.getServer())
      .post('/shipment/calculate')
      .send({
        zipcode: '',
        products: productsMock,
      })
      .expect(400)
  })

  it('should calculate shipment services', async () => {
   const response = await request(app.getServer())
      .post('/shipment/calculate')
      .send({
        zipcode: '12231440',
        products: productsMock,
      })
      .expect(200)

      for (const shipmentService of response.body) {
        expect(shipmentService).toHaveProperty("name")
        expect(shipmentService).toHaveProperty("service")
        expect(shipmentService).toHaveProperty("price")
        expect(shipmentService).toHaveProperty("days")
      }
  })
})
