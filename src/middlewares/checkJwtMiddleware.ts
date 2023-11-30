import { IHttp } from '../http/interfaces/IHttp'
import { AppError } from '../utils/AppError'

export function checkJwtMiddleware(http: IHttp) {
  const jwt = http.getJwt()

  if (!jwt) throw new AppError('Unauthorized', 401)
}
