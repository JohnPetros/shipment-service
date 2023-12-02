import Redis from 'ioredis'
import { ICache } from './ICache'
import { envConfig } from '@configs/envConfig'

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      port: envConfig.REDIS_PORT,
      password: envConfig.REDIS_PASSWORD,
    })
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(data))
  }

  async get<Data>(key: string): Promise<Data | null> {
    const data = await this.redis.get(key)
    if (data) return JSON.parse(data)
    else return null
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
