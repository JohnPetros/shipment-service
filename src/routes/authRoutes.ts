import { AuthorizeController } from '@modules/auth/controllers/AuthorizeControler'
import { CallbackController } from '@modules/auth/controllers/CallbackController'
import { RefreshTokenController } from '@modules/auth/controllers/RefreshTokenController'
import { IRouter } from 'app/interfaces/IRouter'

const authorizeController = new AuthorizeController()
const callbackController = new CallbackController()
const refreshTokenController = new RefreshTokenController()

export function authRoutes(router: IRouter) {
  router.get('/auth/authorize', authorizeController)
  router.get('/auth/callback', callbackController)
  router.get('/auth/refresh_token', refreshTokenController)
}
