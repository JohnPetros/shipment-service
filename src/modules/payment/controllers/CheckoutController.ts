import { CheckoutDTO } from '../dtos/CheckoutDTO'
import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'
import { PaymentProvider } from '@providers/PaymentProvider'
import { CheckoutUseCase } from '@modules/payment/useCases/CheckoutUseCase'
import { ValidationProvider } from '@providers/ValidationProvider'

export class CheckoutController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const { customer, products } = http.getBody<CheckoutDTO>()

    const paymentProvider = new PaymentProvider()
    const validationProvider = new ValidationProvider()
    const getPaymentMethodsUseCase = new CheckoutUseCase(
      paymentProvider,
      validationProvider,
    )

    const checkoutUrl = await getPaymentMethodsUseCase.execute(
      customer,
      products,
    )

    http.send(201, { checkoutUrl })
  }
}
