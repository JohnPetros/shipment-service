import { Server } from 'node:http'

export interface IApp {
  startServer(): void
  stopServer(): Promise<void>
  getServer(): Server
  waitServerAvailability(): Promise<void>
}
