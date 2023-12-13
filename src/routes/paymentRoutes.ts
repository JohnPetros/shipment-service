import { IRouter } from '@http/interfaces/IRouter'
import { CreateTransactionController } from '@modules/payment/controllers/CreateTransactionController'

import { WebhookController } from '@modules/payment/controllers/WebhookController'

const createTransactionController = new CreateTransactionController()
const webhookController = new WebhookController()

export async function paymentRoutes(router: IRouter) {
  router.post(
    '/payment/transaction/:paymentMethod',
    createTransactionController,
  )
  router.post('/payment/webhook', webhookController)
}
