import { Cache } from '@cache/index'
import { errorConfig } from '@configs/errorConfig'
import { cacheConfig } from '@configs/cacheConfig'
import { IHttp } from 'app/interfaces/IHttp'

export class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }

  private async handleIvalidTokenError(http: IHttp) {
    const cache = new Cache()
    await cache.set(cacheConfig.KEYS.PREVIOUS_ROUTE, http.getPreviusRoute())
    http.redirect('/auth/refresh_token')
  }

  async handleError(http: IHttp) {
    switch (this.message) {
      case errorConfig.AUTH.INVALID_TOKEN:
        await this.handleIvalidTokenError(http)
        break
      default:
        http.send(this.statusCode, { message: this.message })
    }
  }
}
