import Redis, { RedisOptions } from 'ioredis'
import { AppError } from '@utils/AppError'
import { ICache } from '@cache/ICache'

const IS_DEV_ENV = process.env.NODE_ENV === 'development'

const USERNAME = process.env.REDIS_USERNAME
const PASSWORD = process.env.REDIS_PASSWORD
const HOST = process.env.REDIS_HOST
const PORT = process.env.REDIS_PORT
const URL = process.env.REDIS_INTERNAL_URL

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    if (!HOST || !USERNAME || !PASSWORD || !PORT || !URL)
      throw new AppError('Redis url connection is not provided')

    let redisOptions: Partial<RedisOptions> = {}

    if (IS_DEV_ENV) {
      redisOptions = {
        host: HOST,
        username: USERNAME,
        password: PASSWORD,
        port: Number(PORT),
        tls: {},
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
