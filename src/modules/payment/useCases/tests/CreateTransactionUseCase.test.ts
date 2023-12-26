// import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
// import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'
// import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
// import { pagarmeApiMock } from '@providers/PaymentProvider/PagarmePaymentProvider/mocks/PagarmeApiMock'
// import {
//   afterAll,
//   afterEach,
//   beforeAll,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'
// import { CreateTransactionUseCase } from '../CreateTransactionUseCase'
// import { PagarMePaymentProvider } from '@providers/PaymentProvider/PagarmePaymentProvider'
// import { IDateProvider } from '@providers/DateProvider/IDateProvider'
// import { IValidationProvider } from '@providers/ValidationProvider/IValidationProvider'
// import { customerMock } from '@entities/mocks/customerMock'
// import { productsMock } from '@entities/mocks/productsMock'
// import { shipmentServiceMock } from '@entities/mocks/shipmentServiceMock'
// import { HttpResponse, http } from 'msw'
// import { envConfig } from '@configs/envConfig'
// import { Transaction } from '@entities/Transaction'
// import { ZodValidationProvider } from '@providers/ValidationProvider/ZodValidationProvider'
// import { PagarmeTransactionResponse } from '@providers/PaymentProvider/PagarmePaymentProvider/types/PagarmeTransactionResponse'
// import { PagarmeCreditCardTransaction } from '@providers/PaymentProvider/PagarmePaymentProvider/types/PagarmeCreditCardTransactionResponse'

// let httpClientProvider: IHttpClientProvider
// let paymentProvider: IPaymentProvider
// let dateProvider: IDateProvider
// let validationProvider: IValidationProvider
// let createTransactionUseCase: CreateTransactionUseCase

// function mockOrdersRouteResponse<TransactionType>(
//   transactionResponse: PagarmeTransactionResponse<TransactionType>,
// ) {
//   pagarmeApiMock.use(
//     http.post(`${envConfig.PAGAR_ME_API_URL}/orders`, () => {
//       return HttpResponse.json<PagarmeTransactionResponse<TransactionType>>(
//         transactionResponse,
//       )
//     }),
//   )
// }

// describe('Create Transaction Use Case', () => {
//   beforeAll(() => pagarmeApiMock.listen())
//   beforeEach(async () => {
//     httpClientProvider = new AxiosHttpClientProvider()
//     paymentProvider = new PagarMePaymentProvider(
//       httpClientProvider,
//       dateProvider,
//     )
//     validationProvider = new ZodValidationProvider()
//     createTransactionUseCase = new CreateTransactionUseCase(
//       paymentProvider,
//       validationProvider,
//     )
//   })
//   afterEach(() => pagarmeApiMock.resetHandlers())
//   afterAll(() => pagarmeApiMock.close())

//   it('should create credit card transaction', async () => {
//     mockOrdersRouteResponse<PagarmeCreditCardTransaction>({
//       status: 'paid',

//     })

//     const response = await createTransactionUseCase.execute({
//       customer: customerMock,
//       paymentMethod: 'credit-card',
//       products: productsMock,
//       shipmentService: shipmentServiceMock,
//       cardToken: 'card token mock',
//     })

//     expect(response)
//   })

//   it('should create pix transaction', async () => {
//     mockOrdersRouteResponse({
//       status: '',
//       qrCode: '',
//       code: '',
//       expires_at: '',
//     })

//     const response = await createTransactionUseCase.execute({
//       customer: customerMock,
//       paymentMethod: 'pix',
//       products: productsMock,
//       shipmentService: shipmentServiceMock,
//     })

//     expect(response)
//   })
// })
