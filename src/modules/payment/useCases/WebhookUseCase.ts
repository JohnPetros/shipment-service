import { IUseCase } from '@http/interfaces/IUseCase'

import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'
import { PagarmeWebhook } from '@providers/PaymentProvider/PagarmePaymentProvider/types/PagarmeWebhook'

import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'

export class WebhookUseCase implements IUseCase<PagarmeWebhook, void> {
  private paymentProvider: IPaymentProvider

  constructor(paymentProvider: IPaymentProvider) {
    this.paymentProvider = paymentProvider
  }

  async execute({ data }: PagarmeWebhook): Promise<void> {
    new Console().log({ data })

    // try {

    //   new Console().log({ payment })
    // } catch (error) {
    //   console.error(error)
    //   throw new AppError('Payment not found', 404)
    // }
  }
}
