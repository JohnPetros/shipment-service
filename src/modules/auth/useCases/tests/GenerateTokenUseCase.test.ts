import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { AppError } from '@utils/AppError'
import { GenerateTokenUseCase } from '../GenerateTokenUseCase'
import { apiServerMock } from '@providers/HttpClientProvider/mocks/httpServerMock'
import { afterEach } from 'node:test'

let httpClientProvider: HttpClientProvider
let shipmentProvider: ShipmentProvider
let generateTokenUseCase: GenerateTokenUseCase

describe('Generate Token Use Case', () => {
  beforeAll(() => apiServerMock.listen())
  beforeEach(async () => {
    httpClientProvider = new HttpClientProvider()
    shipmentProvider = new ShipmentProvider(httpClientProvider)
    generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider)
  })
  afterEach(() => apiServerMock.resetHandlers())
  afterAll(() => apiServerMock.close())

  it('should not be able to generate a token when code is not defined', async () => {
    expect(async () => await generateTokenUseCase.execute('')).rejects.toEqual(
      new AppError('Invalid code', 401),
    )
  })

  it('should be able to generate a token', async () => {
    const jwt = await generateTokenUseCase.execute('code mock')

    expect(jwt.accessToken).toBe('access token mock')
    expect(jwt.refreshToken).toBe('refresh token mock')
  })
})
