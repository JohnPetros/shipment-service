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

  async get<Response>(url: string): Promise<Response> {
    return await this.api.get<Response>(url)
  }

  async post<Response>(url: string, body: unknown): Promise<Response> {
    return await this.api.post<Response>(url, body)
  }
}
