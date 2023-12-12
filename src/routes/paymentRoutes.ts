import { IRouter } from '@http/interfaces/IRouter'

import { WebhookController } from '@modules/payment/controllers/WebhookController'
import { CreateCreditCardTransactionController } from '@modules/payment/controllers/CreateCreditCardTransactionController'

const createCreditCardTransactionController =
  new CreateCreditCardTransactionController()
const webhookController = new WebhookController()

export async function paymentRoutes(router: IRouter) {
  router.post(
    '/payment/credit-card-transaction',
    createCreditCardTransactionController,
  )
  router.post('/payment/webhook', webhookController)
}
