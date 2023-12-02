import { Cache } from '@cache/index'
import { AppErrors } from '@constants/AppErrors'
import { CacheKeys } from '@constants/CacheKeys'
import { IHttp } from '@http/interfaces/IHttp'

export class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }

  private async handleIvalidTokenError(http: IHttp) {
    const cache = new Cache()
    await cache.set(CacheKeys.PREVIOUS_ROUTE, http.getPreviusRoute())
    http.redirect('/auth/refresh_token')
  }

  async handleError(http: IHttp) {
    switch (this.message) {
      case AppErrors.INVALID_TOKEN:
        await this.handleIvalidTokenError(http)
        break
      default:
        http.send(this.statusCode, this.message)
    }
  }
}
