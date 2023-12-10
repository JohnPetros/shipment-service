import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'
import { PaymentProvider } from '@providers/PaymentProvider'
import { GetPaymentMethodsUseCase } from '@modules/payment/useCases/GetPaymentMethodsUseCase'

export class GetPaymentMethodsController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const paymentProvider = new PaymentProvider()
    const getPaymentMethodsUseCase = new GetPaymentMethodsUseCase(
      paymentProvider,
    )

    const paymentMethods = await getPaymentMethodsUseCase.execute()

    http.send(200, paymentMethods)
  }
}
