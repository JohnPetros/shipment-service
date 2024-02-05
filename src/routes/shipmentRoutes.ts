import { CalculateShipmentServicesController } from '@modules/shipment/controllers/CalculateShipmentServicesController'
import { IRouter } from '../app/interfaces/IRouter'

const calculateShipmentServicesController = new CalculateShipmentServicesController()

export async function shipmentRoutes(router: IRouter) {
  router.post('/shipment/calculate', calculateShipmentServicesController)
}
