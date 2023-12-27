import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { pagarmeApiMock } from '@providers/PaymentProvider/PagarmePaymentProvider/mocks/PagarmeApiMock'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { CreateTransactionUseCase } from '../CreateTransactionUseCase'
import { PagarMePaymentProvider } from '@providers/PaymentProvider/PagarmePaymentProvider'
import { IDateProvider } from '@providers/DateProvider/IDateProvider'
import { IValidationProvider } from '@providers/ValidationProvider/IValidationProvider'
import { customerMock } from '@entities/mocks/customerMock'
import { productsMock } from '@entities/mocks/productsMock'
import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'
import { HttpResponse, http } from 'msw'
import { envConfig } from '@configs/envConfig'
import { ZodValidationProvider } from '@providers/ValidationProvider/ZodValidationProvider'

let httpClientProvider: IHttpClientProvider
let paymentProvider: IPaymentProvider
let dateProvider: IDateProvider
let validationProvider: IValidationProvider
let createTransactionUseCase: CreateTransactionUseCase

function mockOrdersRouteResponse(transactionResponse: Record<string, string>) {
  pagarmeApiMock.use(
    http.post(`${envConfig.PAGAR_ME_API_URL}/orders`, () => {
      return HttpResponse.json(transactionResponse)
    }),
  )
}

describe('Create Transaction Use Case', () => {
  beforeAll(() => pagarmeApiMock.listen())
  beforeEach(async () => {
    httpClientProvider = new AxiosHttpClientProvider()
    paymentProvider = new PagarMePaymentProvider(
      httpClientProvider,
      dateProvider,
    )
    validationProvider = new ZodValidationProvider()
    createTransactionUseCase = new CreateTransactionUseCase(
      paymentProvider,
      validationProvider,
    )
  })
  afterEach(() => pagarmeApiMock.resetHandlers())
  afterAll(() => pagarmeApiMock.close())

  it('should create credit card transaction', async () => {
    mockOrdersRouteResponse({
      status: 'paid',
    })

    const response = await createTransactionUseCase.execute({
      customer: customerMock,
      paymentMethod: 'credit-card',
      products: productsMock,
      shipmentService: shipmentServiceMock,
      cardToken: 'card token mock',
    })

    expect(response?.status).toBe('approved')
  })

  it.only('should create ticket transaction', async () => {
    mockOrdersRouteResponse({
      charges: [
        {
          status: 'pending',
          last_transaction: {
            qr_code_url: 'qr_code_url mock',
            expires_at: new Date(),
          },
        },
      ],
    })

    const response = await createTransactionUseCase.execute({
      customer: customerMock,
      paymentMethod: 'credit-card',
      products: productsMock,
      shipmentService: shipmentServiceMock,
      cardToken: 'card token mock',
    })

    expect(response?.status).toBe('approved')
  })
})
