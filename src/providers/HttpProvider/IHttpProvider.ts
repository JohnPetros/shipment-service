interface Request {
  body: unknown
}

export interface IHttpProvider {
  getRequest(): Request
}
