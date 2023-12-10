import { IUseCase } from '@http/interfaces/IUseCase'

import { IPaymentProvider } from '@providers/PaymentProvider/IPaymentProvider'

import { AppError } from '@utils/AppError'
import { Console } from '@utils/Console'

interface Request {
  paymentId: string
}

// 1320039727

export class WebhookUseCase implements IUseCase<Request, void> {
  private paymentProvider: IPaymentProvider

  constructor(paymentProvider: IPaymentProvider) {
    this.paymentProvider = paymentProvider
  }

  async execute({ paymentId }: Request): Promise<void> {
    if (!paymentId) throw new AppError('Payment id is not provided')

    try {
      const payment = await this.paymentProvider.getPayment('1320039727')

      new Console().log({ payment })
    } catch (error) {
      console.error(error)
      throw new AppError('Payment not found', 404)
    }
  }
}
