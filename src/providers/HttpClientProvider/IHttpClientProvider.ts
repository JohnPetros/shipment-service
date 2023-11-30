export interface IHttpClientProvider {
  get<Response>(url: string): Promise<Response>
  post(url: string, body: unknown): Promise<unknown>
  setBaseUrl(url: string): void
}
