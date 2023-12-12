import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'

import { ValidationProvider } from '@providers/ValidationProvider'
import { DayjsDateProvider } from '@providers/DateProvider/DayjsDateProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { PagarMePaymentProvider } from '@providers/PaymentProvider/PagarmePaymentProvider'

import { CreateCreditCardTransactionDTO } from '../dtos/CreateTransactionDTO'
import { CreateCreditTransactionUseCase } from '../useCases/CreateCreditTransactionUseCase'

export class CreateCreditCardTransactionController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const { customer, products, total, creditCard } =
      http.getBody<CreateCreditCardTransactionDTO>()

    const dateProvider = new DayjsDateProvider()
    const httpClientProvider = new AxiosHttpClientProvider()
    const paymentProvider = new PagarMePaymentProvider(
      httpClientProvider,
      dateProvider,
    )
    const validationProvider = new ValidationProvider()
    const createCreditTransactionUseCase = new CreateCreditTransactionUseCase(
      paymentProvider,
      validationProvider,
    )

    const transaction = await createCreditTransactionUseCase.execute({
      customer,
      products,
      creditCard,
      total,
    })

    http.send(201, { status: transaction.status })
  }
}
