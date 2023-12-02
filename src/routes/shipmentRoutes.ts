import { CalculateQuoteController } from '../controllers/shipment/CalculateQuoteController'
import { IRouter } from '../http/interfaces/IRouter'

const calculateQuoteController = new CalculateQuoteController()

export async function shipmentRoutes(router: IRouter) {
  router.post('/shipment/calculate', calculateQuoteController)
}
