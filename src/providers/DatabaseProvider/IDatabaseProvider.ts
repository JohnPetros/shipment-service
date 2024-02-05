import { Order } from '@providers/DatabaseProvider/YampiDatabaseProvider/types/YampiOrder'

export interface IDatabaseProvider {
  saveOrder(order: Order): Promise<void>
}
