export interface IShipmentProvider {
  authorize(): Promise<void>
  getToken(code: string): Promise<string>
  calculate(): Promise<void>
}
