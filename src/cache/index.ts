import { ICache } from './ICache'
import { RedisCache } from './RedisCache'

export class Cache implements ICache {
  private cache: ICache

  constructor() {
    this.cache = new RedisCache()
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.cache.set(key, data)
  }

  async get<Data>(key: string): Promise<Data | null> {
    return await this.cache.get(key)
  }

  async delete(key: string): Promise<void> {
    return await this.cache.delete(key)
  }
}
