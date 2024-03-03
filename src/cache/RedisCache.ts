import Redis from 'ioredis'
import { ICache } from './ICache'
import { AppError } from '@utils/AppError'

const URL = process.env.NODE_ENV === 'development'
  ? process.env.REDIS_EXTERNAL_URL
  : process.env.REDIS_INTERNAL_URL


// redis://red-clmc2e1fb9qs739b6cl0:iXwYwU7pV675NNAegTbmoyABnProb758@oregon-redis.render.com:6379


export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    if (!URL) throw new AppError('Redis url connection is not provided')

    try {
      const client = this.redis = new Redis(URL)
      client.on('error', error => {
        console.log(error);
      });
    } catch (error) {
      throw new AppError('Redis connection error')
    }

    // this.redis = new Redis(URL)
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
