import Redis, { RedisOptions } from 'ioredis'
import { ICache } from './ICache'
import { AppError } from '@utils/AppError'

const IS_DEV_ENV = process.env.NODE_ENV === 'development'

const USERNAME = process.env.REDIS_USERNAME
const PASSWORD = process.env.REDIS_PASSWORD
const HOST = process.env.REDIS_HOST
const PORT = process.env.REDIS_PORT

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    if (!HOST || !USERNAME || !PASSWORD || !PORT) throw new AppError('Redis url connection is not provided')

    let redisOptions: Partial<RedisOptions> = {}

    if (IS_DEV_ENV) {
      redisOptions = {
        host: HOST,
        username: USERNAME,
        password: PASSWORD,
        port: Number(PORT),
      }

    } else {
      redisOptions = {
        host: HOST,
        port: Number(PORT),
      }
    }

    try {
      const client = this.redis = new Redis({
        ...redisOptions,
        tls: {},
      })
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
