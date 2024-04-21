import request from 'supertest'
import { afterAll, beforeAll, describe, it } from 'vitest'

import { app } from 'app'
import { productsMock } from '@entities/mocks/productsMock'

require('dotenv').config()

describe('Generate Token Use Case', () => {
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
    await request(app.getServer())
      .post('/shipment/calculate')
      .send({
        zipcode: 'code',
        products: productsMock,
      })
      .expect(400)
  })
})
