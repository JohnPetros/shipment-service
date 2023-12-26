import { Product } from "@entities/Product";

export const productsMock: Product[] = [
  {
    id: '1',
    name: 'Produto A',
    quantity: 3,
    price: 19.99,
    length: 8.0,
    width: 5.5,
    height: 2.0,
    weight: 0.5,
    sku: 'sku-1'
  },
  {
    id: '2',
    name: 'Produto B',
    quantity: 2,
    price: 29.99,
    length: 12.0,
    width: 9.0,
    height: 4.0,
    weight: 1.0,
    sku: 'sku-2'

  },
  {
    id: '3',
    name: 'Produto C',
    quantity: 1,
    price: 39.99,
    length: 15.0,
    width: 11.0,
    height: 6.0,
    weight: 1.5,
    sku: 'sku-3'
  },
]
