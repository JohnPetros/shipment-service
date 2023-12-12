import { Product } from '@entities/Product'

export interface CalculateQuoteDTO {
  zipcode: number
  products: Product[]
}
