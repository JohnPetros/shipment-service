import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { ShipmentProvider } from '@providers/ShipmentProvider'
import { HttpClientProvider } from '@providers/HttpClientProvider'
import { AppError } from '@utils/AppError'
import { apiServerMock } from '@providers/HttpClientProvider/mocks/httpClientProviderMock'
import { CalculateQuoteUseCase } from '../CalculateQuoteUseCase'
import { jwtMock } from '@entities/mocks/jwtMock'
import { quoteMock } from '@entities/mocks/shipmentServiceMock'

let httpClientProvider: HttpClientProvider
let shipmentProvider: ShipmentProvider
let calculateQuoteUseCase: CalculateQuoteUseCase

describe('Generate Token Use Case', () => {
  beforeAll(() => apiServerMock.listen())
  beforeEach(async () => {
    httpClientProvider = new HttpClientProvider()
    shipmentProvider = new ShipmentProvider(httpClientProvider)
    calculateQuoteUseCase = new CalculateQuoteUseCase(shipmentProvider)
  })
  afterEach(() => apiServerMock.resetHandlers())
  afterAll(() => apiServerMock.close())

  it('should not be able to calculate quote when zipcode is not defined', async () => {
    expect(
      async () =>
        await calculateQuoteUseCase.execute(
          {
            zipcode: 0,
            skus: [
              {
                price: 12.0,
                quantity: 2,
                length: 1,
                width: 1,
                height: 1,
                weight: 1,
              },
            ],
          },
          jwtMock.accessToken,
        ),
    ).rejects.toEqual(new AppError('Zipcode or skus are incorrect', 402))
  })

  it('should not be able to calculate quote when skus are not defined', async () => {
    expect(
      async () =>
        await calculateQuoteUseCase.execute(
          {
            zipcode: 929292,
            // eslint-disable-next-line
            // @ts-ignore
            skus: [],
          },
          '424242',
        ),
    ).rejects.toEqual(new AppError('Zipcode or skus are incorrect', 402))
  })

  it('should be able to calculate quote', async () => {
    const response = await calculateQuoteUseCase.execute(
      {
        zipcode: 929292,
        skus: [
          {
            price: 12.0,
            quantity: 2,
            length: 1,
            width: 1,
            height: 1,
            weight: 1,
          },
        ],
      },
      '424242',
    )

    expect(response).toEqual([expect.objectContaining(quoteMock)])
  })
})
