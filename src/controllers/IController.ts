import { IHttp } from '../http/interfaces/IHttp'

export interface ICrontroller {
  handle(http: IHttp): JSON
}
