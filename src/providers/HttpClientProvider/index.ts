import { AxiosHttpClientProvider } from './AxiosHttpClientProvider'
import { IHttpClientProvider } from './IHttpClientProvider'

export class HttpClientProvider implements IHttpClientProvider {
  private api: IHttpClientProvider

  constructor() {
    this.api = new AxiosHttpClientProvider()
  }

  setBaseUrl(url: string): void {
    this.api.setBaseUrl(url)
  }

  setBearerToken(token: string) {
    this.api.setBearerToken(token)
  }

  async get<Response>(url: string): Promise<Response> {
    return await this.api.get<Response>(url)
  }

  async post<Response>(url: string, body: unknown): Promise<Response> {
    return await this.api.post<Response>(url, body)
  }

  getResponseError<ResponseError>(error: unknown): ResponseError {
    return this.api.getResponseError(error)
  }
}
