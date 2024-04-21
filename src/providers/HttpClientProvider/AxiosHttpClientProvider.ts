import axios, { AxiosInstance, isAxiosError } from 'axios'
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

  setJwt(token: string) {
    this.axios.defaults.headers.common.Authorization = token
  }

  setAuth(username: string, password: string): void {
    this.axios.defaults.auth = {
      username,
      password,
    }
  }

  setHeader(key: string, value: string) {
    this.axios.defaults.headers[key] = value
  }

  setParams(key: string, value: string) {
    this.axios.defaults.params = {
      [key]: value,
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

  getResponseError<ResponseError>(error: unknown): ResponseError {
    if (isAxiosError(error)) {
      return error.response?.data
    }

    return error as ResponseError
  }
}
