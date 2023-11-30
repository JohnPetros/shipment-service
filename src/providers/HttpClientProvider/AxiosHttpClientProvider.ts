import axios, { AxiosInstance } from 'axios'
import { IHttpClientProvider } from './IHttpClientProvider'

export class AxiosHttpClientProvider implements IHttpClientProvider {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  setBaseUrl(baseUrl: string) {
    this.axios.defaults.baseURL = baseUrl
  }

  setBearerToken(token: string) {
    this.axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token
    }
  }

  async get<Response>(url: string): Promise<Response> {
    const response = await this.axios.get(url)
    return response.data
  }

  async post<Response>(url: string, body: unknown): Promise<Response> {
    const response = await this.axios.post(url, body)

    return response.data
  }
}
