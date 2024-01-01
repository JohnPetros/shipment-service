import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { AppError } from '@utils/AppError'
import { httpClientProviderMock } from '@providers/HttpClientProvider/mocks/httpClientProviderMock'
import { CalculateQuoteUseCase } from '../CalculateShipmentServicesUseCase'
import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'
import { IShipmentProvider } from '@providers/ShipmentProvider/IShipmentProvider'
import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { productsMock } from '@entities/mocks/productsMock'
import { ICache } from '@cache/ICache'
import { CacheMock } from '@cache/CacheMock'

let httpClientProvider: IHttpClientProvider
let shipmentProvider: IShipmentProvider
let cache: ICache
let calculateQuoteUseCase: CalculateQuoteUseCase

describe('Generate Token Use Case', () => {
  beforeAll(() => httpClientProviderMock.listen())
  beforeEach(async () => {
    httpClientProvider = new AxiosHttpClientProvider()
    shipmentProvider = new MelhorEnvioShipmentProvider(httpClientProvider)
    cache = new CacheMock()

    calculateQuoteUseCase = new CalculateQuoteUseCase(shipmentProvider, cache)
  })
  afterEach(() => httpClientProviderMock.resetHandlers())
  afterAll(() => httpClientProviderMock.close())

  // it('should not be able to calculate quote when zipcode is not defined', async () => {
  //   expect(
  //     async () =>
  //       await calculateQuoteUseCase.execute({
  //         products: productsMock,
  //         zipcode: 0,
  //       }),
  //   ).rejects.toEqual(new AppError('Zipcode or skus are incorrect', 402))
  // })

  // it('should not be able to calculate quote when skus are not defined', async () => {
  //   expect(
  //     async () =>
  //       await calculateQuoteUseCase.execute({
  //         zipcode: 929292,
  //         // eslint-disable-next-line
  //           // @ts-ignore
  //         products: [],
  //       }),
  //   ).rejects.toEqual(new AppError('Zipcode or skus are incorrect', 402))
  // })

  // it('should be able to calculate quote', async () => {
  //   const response = await calculateQuoteUseCase.execute({
  //     zipcode: 929292,
  //     products: productsMock,
  //   })

  //   expect(response).toEqual([expect.objectContaining(shipmentServiceMock)])
  // })
})
