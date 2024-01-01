import { Product } from '@entities/Product'

export interface CalculateShipmentServicesDTO {
  zipcode: number
  products: Product[]
}
