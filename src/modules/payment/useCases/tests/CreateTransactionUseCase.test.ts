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
import { DayjsDateProvider } from '@providers/DateProvider/DayjsDateProvider'
import { transactionConfig } from '@configs/transactionConfig'
import { AppError } from '@utils/AppError'
import { Customer } from '@entities/Customer'

let httpClientProvider: IHttpClientProvider
let paymentProvider: IPaymentProvider
let dateProvider: IDateProvider
let validationProvider: IValidationProvider
let createTransactionUseCase: CreateTransactionUseCase

function mockOrdersRouteResponse(transactionResponse: Record<string, unknown>) {
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
    dateProvider = new DayjsDateProvider()
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

  it('should not create credit card transaction without token card', async () => {
    mockOrdersRouteResponse({
      status: 'paid',
    })

    await expect(async () => {
      await createTransactionUseCase.execute({
        customer: customerMock,
        paymentMethod: 'credit-card',
        products: productsMock,
        shipmentService: shipmentServiceMock,
        cardToken: '',
      })
    }).rejects.toEqual(new AppError('credit card token is not provided', 400))
  })

  it('should create pix transaction', async () => {
    const pixExpiresAt = dateProvider.addMinutes(
      new Date(),
      transactionConfig.PIX.EXPIRES_IN_MINUTES,
    )

    mockOrdersRouteResponse({
      status: 'pending',
      charges: [
        {
          last_transaction: {
            expires_at: pixExpiresAt,
          },
        },
      ],
    })

    const response = await createTransactionUseCase.execute({
      customer: customerMock,
      paymentMethod: 'pix',
      products: productsMock,
      shipmentService: shipmentServiceMock,
    })

    if (response) {
      expect(response.status).toBe('pending')
      expect(response.expires_at?.toString()).toBe(pixExpiresAt.toISOString())
    }
  })

  it('should create credit ticket transaction', async () => {
    mockOrdersRouteResponse({
      status: 'pending',
    })

    const response = await createTransactionUseCase.execute({
      customer: customerMock,
      paymentMethod: 'ticket',
      products: productsMock,
      shipmentService: shipmentServiceMock,
    })

    expect(response?.status).toBe('pending')
  })

  it('should not create transaction with invalid customer', async () => {
    const invalidCustomer: Customer = {
      id: '123456789',
      email: 'clien',
      name: 'Cliente Exemplo',
      phone: '123-456-7890',
      type: 'natural',
      document: '12345678901',
      address: {
        number: 42,
        street: 'Rua Ali peto',
        neighborhood: 'Bairro dos Índios',
        zipCode: '12345678',
        city: 'Cidade Fantasma',
        state: 'Estado de Ninguém',
      },
    }

    await expect(async () => {
      await createTransactionUseCase.execute({
        customer: invalidCustomer,
        paymentMethod: 'credit-card',
        products: productsMock,
        shipmentService: shipmentServiceMock,
        cardToken: '',
      })
    }).rejects.toEqual(
      new AppError('Customer data is invalid. Error: Email is invalid', 400),
    )
  })
})
