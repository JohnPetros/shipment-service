import { Jwt } from '../../Entities/Jwt'

export interface IShipmentProvider {
  authorize(): Promise<void>
  getToken(code: string): Promise<Jwt>
  calculate(): Promise<void>
}
