import { IHttpClientProvider } from '@providers/HttpClientProvider/IHttpClientProvider'

import { AppError } from '@utils/AppError'

import { envConfig } from '@configs/envConfig'
import { IDatabaseProvider } from '../IDatabaseProvider'
import { Order } from '@entities/Order'
const { ALIAS, YAMPI_BASE_URL, YAMPI_SECRET_KEY, YAMPI_TOKEN } = envConfig

export class YampiDatabaseProvider implements IDatabaseProvider {
  private api: IHttpClientProvider

  constructor(httpClientProvider: IHttpClientProvider) {
    if (!ALIAS || !YAMPI_BASE_URL || !YAMPI_SECRET_KEY || !YAMPI_TOKEN)
      throw new AppError('Ivalid Yampi env vars')

    this.api = httpClientProvider

    this.api.setBaseUrl(`${YAMPI_BASE_URL}/${ALIAS}`)
    this.api.setHeader('User-Token', YAMPI_TOKEN)
    this.api.setHeader('User-Secret-Key', YAMPI_SECRET_KEY)
  }

  async saveOrder(order: Order) {
    await this.api.post('/orders', order)
  }
}
