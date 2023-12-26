export interface IHttpClientProvider {
  get<Response>(url: string): Promise<Response>
  post<Response>(url: string, body: unknown): Promise<Response>
  setBaseUrl(url: string): void
  setJwt(token: string): void
  setAuth(username: string, password: string): void
  setHeader(key: string, value: string): void
  setParams(key: string, value: string): void
  getResponseError<ResponseError>(error: unknown): ResponseError
}
