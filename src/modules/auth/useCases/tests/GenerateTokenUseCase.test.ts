// import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
// import { AppError } from '@utils/AppError'
// import { GenerateTokenUseCase } from '../GenerateTokenUseCase'
// import { httpClientProviderMock } from '@providers/HttpClientProvider/mocks/httpClientProviderMock'
// import { afterEach } from 'node:test'
// import { IShipmentProvider } from '@providers/ShipmentProvider/IShipmentProvider'
// import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
// import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
// import { ICache } from '@cache/ICache'
// import { CacheMock } from '@cache/CacheMock'
// import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'

// let httpClientProvider: IHttpClientProvider
// let shipmentProvider: IShipmentProvider
// let generateTokenUseCase: GenerateTokenUseCase
// let cache: ICache

// describe('Generate Token Use Case', () => {
//   beforeAll(() => httpClientProviderMock.listen())
//   beforeEach(async () => {
//     httpClientProvider = new AxiosHttpClientProvider()
//     shipmentProvider = new MelhorEnvioShipmentProvider(httpClientProvider)

//     cache = new CacheMock()
//     generateTokenUseCase = new GenerateTokenUseCase(shipmentProvider, cache)
//   })
//   afterEach(() => httpClientProviderMock.resetHandlers())
//   afterAll(() => httpClientProviderMock.close())

//   it('should not be able to generate a token when code is not defined', async () => {
//     expect(async () => await generateTokenUseCase.execute('')).rejects.toEqual(
//       new AppError('Invalid code', 401),
//     )
//   })

//   it('should be able to generate a token', async () => {
//     const jwt = await generateTokenUseCase.execute('code mock')

//     expect(jwt.accessToken).toBe('access token mock')
//     expect(jwt.refreshToken).toBe('refresh token mock')
//   })
// })
