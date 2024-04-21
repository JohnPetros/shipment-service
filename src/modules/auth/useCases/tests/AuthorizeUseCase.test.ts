import { describe, expect, it } from 'vitest'

import { AuthorizeUseCase } from '../AuthorizeUseCase'
import { InMemoryShipmentProvider } from '@providers/ShipmentProvider/InMemoryShipmentProvider'

const shipmentProvider = new InMemoryShipmentProvider()

describe('Authorize Use Case', () => {
  it('Should throw an error if the shipment provider could not authorize app', () => {
    shipmentProvider.authorize = async () => {
      throw new Error()
    }

    const authorizeUseCase = new AuthorizeUseCase(shipmentProvider)

    expect(async () => await authorizeUseCase.execute()).rejects.toThrow(
      'Failed to authorize user'
    )
  })

  it('Should return url if the shipment provider could authorize app', async () => {
    const urlMock = 'url mock'

    shipmentProvider.authorize = async () => {
      return urlMock
    }

    const authorizeUseCase = new AuthorizeUseCase(shipmentProvider)

    const url = await authorizeUseCase.execute()

    expect(url).toBe(urlMock)
  })
})
