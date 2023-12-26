import { Order } from '@entities/Order'

export interface IDatabaseProvider {
  saveOrder(order: Order): Promise<void>
}
