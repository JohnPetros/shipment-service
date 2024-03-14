import { describe, expect, it } from 'vitest'

import { InMemoryShipmentProvider } from '@providers/ShipmentProvider/InMemoryShipmentProvider'

import { productsMock } from '@entities/mocks/productsMock'

import { InMemoryCache } from '@cache/InMemoryCache'

import { cacheConfig } from '@configs/cacheConfig'
import { errorConfig } from '@configs/errorConfig'

import { shuffleArray } from '@helpers/shuffleArray'

import { AppError } from '@utils/AppError'

import { CalculateShipmentServicesUseCase } from '../CalculateShipmentServicesUseCase'
import { ShipmentService } from '@entities/ShipmentService'

const shipmentProvider = new InMemoryShipmentProvider()
const cache = new InMemoryCache()

describe('Calculate Shipment Services Use Case', () => {
  it('should not be able to calculate the shipment service if the provided zipcode is not defined', async () => {
    const calculateShipmentServicesUseCase = new CalculateShipmentServicesUseCase(
      shipmentProvider,
      cache
    )

    expect(
      async () =>
        await calculateShipmentServicesUseCase.execute({
          products: productsMock,
          zipcode: 0,
        })
    ).rejects.toEqual(new AppError('Zipcode or products are incorrect', 402))
  })

  it('should not be able to calculate quote when products are not defined', async () => {
    const calculateShipmentServicesUseCase = new CalculateShipmentServicesUseCase(
      shipmentProvider,
      cache
    )

    expect(
      async () =>
        await calculateShipmentServicesUseCase.execute({
          zipcode: 929292,
          // eslint-disable-next-line
          // @ts-ignore
          products: [],
        })
    ).rejects.toEqual(new AppError('Zipcode or products are incorrect', 402))
  })

  it('should not be able to calculate shipment service if there is no access token', async () => {
    const calculateShipmentServicesUseCase = new CalculateShipmentServicesUseCase(
      shipmentProvider,
      cache
    )

    expect(
      async () =>
        await calculateShipmentServicesUseCase.execute({
          zipcode: 929292,
          products: productsMock,
        })
    ).rejects.toEqual(new AppError(errorConfig.AUTH.INVALID_TOKEN, 402))
  })

  it('should handle api error if use case throws a error on calculate shipment service', async () => {
    shipmentProvider.calculate = async () => {
      throw new Error()
    }

    await cache.set(cacheConfig.KEYS.ACCESS_TOKEN, 'access token mock')

    const calculateShipmentServicesUseCase = new CalculateShipmentServicesUseCase(
      shipmentProvider,
      cache
    )

    expect(
      async () =>
        await calculateShipmentServicesUseCase.execute({
          zipcode: 929292,
          products: productsMock,
        })
    ).rejects.toEqual(new AppError('Failed to calculate shipment quotes', 500))
  })

  it('should sort shipment services by price in descender order', async () => {
    const shipmentServivesMock: ShipmentService[] = [
      {
        name: 'Shipment Service Name 1',
        days: 5,
        price: 100,
        service: 'Shipment Service Description 1',
      },
      {
        name: 'Shipment Service Name 2',
        days: 5,
        price: 200,
        service: 'Shipment Service Description 2',
      },
      {
        name: 'Shipment Service Name 3',
        days: 5,
        price: 300,
        service: 'Shipment Service Description 3',
      },
      {
        name: 'Shipment Service Name 4',
        days: 5,
        price: 400,
        service: 'Shipment Service Description 4',
      },
      {
        name: 'Shipment Service Name 5',
        days: 5,
        price: 500,
        service: 'Shipment Service Description 5',
      },
    ]

    shipmentProvider.calculate = async () => {
      return shuffleArray(shipmentServivesMock)
    }

    await cache.set(cacheConfig.KEYS.ACCESS_TOKEN, 'access token mock')

    const calculateShipmentServicesUseCase = new CalculateShipmentServicesUseCase(
      shipmentProvider,
      cache
    )

    const response = await calculateShipmentServicesUseCase.execute({
      zipcode: 929292,
      products: productsMock,
    })

    expect(response).toEqual(shipmentServivesMock)
  })
})
