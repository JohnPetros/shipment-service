import { describe, expect, it } from 'vitest'

import type { Jwt } from '@entities/Jwt'

import { InMemoryShipmentProvider } from '@providers/ShipmentProvider/InMemoryShipmentProvider'

import { InMemoryCache } from '@cache/InMemoryCache'

import { cacheConfig } from '@configs/cacheConfig'

import { GenerateTokenUseCase } from '../GenerateTokenUseCase'

const shipmentProvider = new InMemoryShipmentProvider()
const cache = new InMemoryCache()

describe('Generate Token Use Case', () => {
  it('Should throw an error if the code to generate the token is not provided', () => {
    const generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider, cache)

    expect(async () => await generateTokenUseCase.execute('')).rejects.toThrow(
      'Invalid code'
    )
  })

  it('Should throw an error if the shipment provider could not generate the token', () => {
    shipmentProvider.getToken = async () => {
      throw new Error()
    }

    const generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider, cache)

    expect(async () => await generateTokenUseCase.execute('code mock')).rejects.toThrow(
      'Failed to generate token'
    )
  })

  it('Should set the genereted token (jwt) in cache', async () => {
    const jwt: Jwt = {
      accessToken: 'accessToken mock',
      refreshToken: 'refreshToken mock',
    }

    shipmentProvider.getToken = async () => {
      return jwt
    }

    const generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider, cache)

    await generateTokenUseCase.execute('code mock')

    const accessTokenInCache = await cache.get(cacheConfig.KEYS.ACCESS_TOKEN)
    const refreshTokenInCache = await cache.get(cacheConfig.KEYS.REFRESH_TOKEN)

    expect(accessTokenInCache).toBe(accessTokenInCache)
    expect(refreshTokenInCache).toBe(jwt.refreshToken)
  })

  it('Should return the genereted token (jwt)', async () => {
    const jwt: Jwt = {
      accessToken: 'accessToken mock',
      refreshToken: 'refreshToken mock',
    }

    shipmentProvider.getToken = async () => {
      return jwt
    }

    const generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider, cache)

    const returnedJwt = await generateTokenUseCase.execute('code mock')

    expect(returnedJwt).toEqual(jwt)
  })
})
