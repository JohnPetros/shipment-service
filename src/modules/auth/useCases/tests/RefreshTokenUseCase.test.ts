import { InMemoryCache } from '@cache/InMemoryCache'
import { cacheConfig } from '@configs/cacheConfig'
import { describe, expect, it } from 'vitest'
import { RefreshTokenUseCase } from '../RefreshTokenUseCase'
import { InMemoryShipmentProvider } from '@providers/ShipmentProvider/InMemoryShipmentProvider'
import { Jwt } from '@entities/Jwt'

const shipmentProvider = new InMemoryShipmentProvider()

describe('Authorize Use Case', () => {
  it('Should throw an error if a refresh token is not in cache', async () => {
    const cache = new InMemoryCache()

    await cache.set(cacheConfig.KEYS.REFRESH_TOKEN, '')

    const authorizeUseCase = new RefreshTokenUseCase(shipmentProvider, cache)

    expect(async () => await authorizeUseCase.execute()).rejects.toThrow(
      'Refresh token is not found'
    )
  })

  it('Should throw an error if the shipment provider could not refresh token', async () => {
    const cache = new InMemoryCache()

    await cache.set(cacheConfig.KEYS.REFRESH_TOKEN, 'refresh token mock')

    shipmentProvider.getToken = async () => {
      throw new Error()
    }

    const authorizeUseCase = new RefreshTokenUseCase(shipmentProvider, cache)

    expect(async () => await authorizeUseCase.execute()).rejects.toThrow(
      'Failed to refresh token'
    )
  })

  it('Should be able to update the jwt in cache', async () => {
    const cache = new InMemoryCache()

    await cache.set(cacheConfig.KEYS.ACCESS_TOKEN, 'old access token')
    await cache.set(cacheConfig.KEYS.REFRESH_TOKEN, 'old refresh token')

    const jwt: Jwt = {
      accessToken: 'new access token',
      refreshToken: 'new refresh token',
    }

    shipmentProvider.refreshToken = async () => {
      return jwt
    }

    const authorizeUseCase = new RefreshTokenUseCase(shipmentProvider, cache)

    await authorizeUseCase.execute()

    const accessTokenInCache = await cache.get(cacheConfig.KEYS.ACCESS_TOKEN)
    const refreshTokenInCache = await cache.get(cacheConfig.KEYS.REFRESH_TOKEN)

    expect(accessTokenInCache).toBe(jwt.accessToken)
    expect(refreshTokenInCache).toBe(jwt.refreshToken)
  })
})
