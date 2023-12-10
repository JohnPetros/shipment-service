import { IRouter } from '@http/interfaces/IRouter'
import { CheckoutController } from '@modules/payment/controllers/CheckoutController'
import { GetPaymentMethodsController } from '@modules/payment/controllers/GetPaymentMethodsController'

const getPaymentMethodsController = new GetPaymentMethodsController()
const checkoutController = new CheckoutController()

export async function paymentRoutes(router: IRouter) {
  router.get('/payment/methods', getPaymentMethodsController)
  router.post('/payment/checkout', checkoutController)
}
