import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'
import { PaymentProvider } from '@providers/PaymentProvider'
import { WebhookUseCase } from '../useCases/WebhookUseCase'

export class WebhookController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const { data } = http.getBody<{ data: { id: string } }>()

    const paymentProvider = new PaymentProvider()
    const webhookUseCase = new WebhookUseCase(paymentProvider)

    await webhookUseCase.execute({ paymentId: data.id })

    http.send(201, { data })
  }
}
