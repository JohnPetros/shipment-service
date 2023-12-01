import { Server } from 'node:http'

export interface IApp {
  initServer(): void
  closeServer(): Promise<void>
  getServer(): Server
  waitServerAvailability(): Promise<void>
}
