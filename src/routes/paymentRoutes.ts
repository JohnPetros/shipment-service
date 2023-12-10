import { IRouter } from '@http/interfaces/IRouter'
import { CheckoutController } from '@modules/payment/controllers/CheckoutController'

import { WebhookController } from '@modules/payment/controllers/WebhookController'

const checkoutController = new CheckoutController()
const webhookController = new WebhookController()

export async function paymentRoutes(router: IRouter) {
  router.post('/payment/checkout', checkoutController)
  router.post('/payment/webhook', webhookController)
}
