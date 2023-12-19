import { ICrontroller } from '@http/interfaces/IController'
import { IHttp } from '@http/interfaces/IHttp'
import { WebhookUseCase } from '../useCases/WebhookUseCase'
import { DayjsDateProvider } from '@providers/DateProvider/DayjsDateProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { PagarMePaymentProvider } from '@providers/PaymentProvider/PagarmePaymentProvider'
import { PagarmeWebhook } from '@providers/PaymentProvider/PagarmePaymentProvider/types/PagarmeWebhook'

export class WebhookController implements ICrontroller {
  async handle(http: IHttp): Promise<void> {
    const payload = http.getBody<PagarmeWebhook>()

    const httpClientProvider = new AxiosHttpClientProvider()
    const dateProvider = new DayjsDateProvider()
    const pagarMePaymentProvider = new PagarMePaymentProvider(
      httpClientProvider,
      dateProvider,
    )
    const webhookUseCase = new WebhookUseCase(pagarMePaymentProvider)

    await webhookUseCase.execute(payload)

    http.send(200, payload)
  }
}
