import { IHttp } from '../../../http/interfaces/IHttp'
import { CalculateShipmentServicesUseCase } from '../useCases/CalculateShipmentServicesUseCase'
import { ICrontroller } from '../../../http/interfaces/IController'
import { MelhorEnvioShipmentProvider } from '@providers/ShipmentProvider/MelhorEnvioShipmentProvider'
import { AxiosHttpClientProvider } from '@providers/HttpClientProvider/AxiosHttpClientProvider'
import { CalculateShipmentServicesDTO } from '../dtos/CalculateShipmentServicesDTO'
import { RedisCache } from '@cache/RedisCache'

export class CalculateShipmentServicesController implements ICrontroller {
  async handle(http: IHttp) {
    const { zipcode, products } = http.getBody<CalculateShipmentServicesDTO>()

    const axiosHttpClientProvider = new AxiosHttpClientProvider()
    const shippmentProvider = new MelhorEnvioShipmentProvider(
      axiosHttpClientProvider,
    )
    const calculateUseCase = new CalculateShipmentServicesUseCase(
      shippmentProvider,
      new RedisCache(),
    )

    const shipmentServices = await calculateUseCase.execute({
      zipcode,
      products,
    })

    http.send(200, shipmentServices)
  }
}
