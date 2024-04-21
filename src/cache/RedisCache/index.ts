import { ICache } from '@cache/ICache'
import { envConfig } from '@configs/envConfig'
import { AppError } from '@utils/AppError'
import Redis, { RedisOptions } from 'ioredis'

const IS_DEV_ENV =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

const USERNAME = process.env.VITE_REDIS_USERNAME
const PASSWORD = process.env.VITE_REDIS_PASSWORD
const HOST = process.env.VITE_REDIS_HOST
const PORT = process.env.VITE_REDIS_PORT
const URL = process.env.REDIS_URL

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    let redisOptions: Partial<RedisOptions> = {}

    if (IS_DEV_ENV) {
      if (!HOST || !USERNAME || !PASSWORD || !PORT)
        throw new AppError('Redis env variables connection is not provided')

      redisOptions = {
        host: HOST,
        password: 'sertton',
        port: Number(PORT),
      }

      try {
        const client = (this.redis = new Redis(redisOptions))
        client.on('error', (error) => {
          console.log(error)
        })
      } catch (error) {
        throw new AppError('Redis connection error')
      }

      return
    }

    if (!URL) {
      throw new AppError('Redis url connection is not provided')
    }

    try {
      const client = (this.redis = new Redis(URL))
      client.on('error', (error) => {
        console.log(error)
      })
    } catch (error) {
      throw new AppError('Redis connection error')
    }
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
