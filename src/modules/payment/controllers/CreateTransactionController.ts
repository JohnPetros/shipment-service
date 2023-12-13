import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'

import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO'
import { CreateTransactionUseCase } from '../useCases/CreateTransactionUseCase'

import { DayjsDateProvider } from '@providers/DateProvider/DayjsDateProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { PagarMePaymentProvider } from '@providers/PaymentProvider/PagarmePaymentProvider'
import { ZodValidationProvider } from '@providers/ValidationProvider/ZodValidationProvider'

import { PaymentMethod } from '@entities/PaymentMethod'

export class CreateTransactionController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const { customer, products, creditCard } =
      http.getBody<CreateTransactionDTO>()

    const { paymentMethod } = http.getParams<{ paymentMethod: PaymentMethod }>()

    const dateProvider = new DayjsDateProvider()
    const httpClientProvider = new AxiosHttpClientProvider()
    const paymentProvider = new PagarMePaymentProvider(
      httpClientProvider,
      dateProvider,
    )
    const zodValidationProvider = new ZodValidationProvider()
    const createTransactionUseCase = new CreateTransactionUseCase(
      paymentProvider,
      zodValidationProvider,
    )

    const transaction = await createTransactionUseCase.execute({
      customer,
      products,
      creditCard,
      paymentMethod,
    })

    http.send(201, transaction)
  }
}
