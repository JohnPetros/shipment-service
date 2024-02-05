import { IHttp } from 'app/interfaces/IHttp'

export interface ICrontroller {
  handle(http: IHttp): Promise<void>
}
