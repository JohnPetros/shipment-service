import { ICache } from './ICache'

export class CacheMock implements ICache {
  private chache: Record<string, string> = {}

  async set(key: string, data: unknown): Promise<void> {
    this.chache[key] = JSON.stringify(data)
  }

  async get<Data>(key: string): Promise<Data | null> {
    const data = this.chache[key]

    if (data) return JSON.parse(data)

    return null
  }

  async delete(key: string): Promise<void> {
    delete this.chache[key]
  }
}
