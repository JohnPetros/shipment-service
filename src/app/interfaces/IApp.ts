import { Server } from 'node:http'

export interface IApp {
  startServer(): void
  stopServer(): Promise<void>
  getServer(): Server
  setCron(cronExpression: string, callback: () => Promise<void>): void
  waitServerAvailability(): Promise<void>
}
