export interface IHttpClientProvider {
  get<Response>(url: string): Promise<Response>
  post<Response>(url: string, body: unknown): Promise<Response>
  setBaseUrl(url: string): void
  setBearerToken(token: string): void
  getResponseError<ResponseError>(error: unknown): ResponseError
}
