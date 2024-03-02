import Redis from 'ioredis'
import { ICache } from './ICache'
import { AppError } from '@utils/AppError'
import { envConfig } from '@configs/envConfig'

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    const PORT = envConfig.REDIS_PORT

    if (!PORT) throw new AppError('Redis connection PORT is not provided')

    try {
      this.redis = new Redis({ port: PORT })
    } catch (error) {
      throw new AppError('Redis connection error')
    }

    this.redis = new Redis()
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(data))
  }

  async get<Data>(key: string): Promise<Data | null> {
    const data = await this.redis.get(key)
    if (data) return JSON.parse(data)

    return null
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
