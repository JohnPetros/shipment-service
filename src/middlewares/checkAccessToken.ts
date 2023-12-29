import { Cache } from '@cache/index'
import { cacheConfig } from '@configs/cacheConfig'
import { AppError } from '@utils/AppError'

export async function checkAccessToken() {
  const cache = new Cache()

  const accessToken = await cache.get<string>(cacheConfig.KEYS.ACCESS_TOKEN)

  if (!accessToken) {
    throw new AppError('Access token is not provided')
  }
}
