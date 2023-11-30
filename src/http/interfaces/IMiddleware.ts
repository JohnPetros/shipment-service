import { IHttp } from './IHttp'

export type IMiddleware = (http: IHttp) => void
