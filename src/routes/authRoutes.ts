import { AuthorizeController } from '@controllers/auth/AuthorizeControler'
import { CallbackController } from '@controllers/auth/CallbackController'
import { RefreshTokenController } from '@controllers/auth/RefreshTokenController'
import { IRouter } from '@http/interfaces/IRouter'
import { checkJwtMiddleware } from 'middlewares/checkJwtMiddleware'

const authorizeController = new AuthorizeController()
const callbackController = new CallbackController()
const refreshTokenController = new RefreshTokenController()

export async function authRoutes(router: IRouter) {
  router.get('/auth/authorize', authorizeController)
  router.get('/auth/callback', callbackController)
  router.get('/auth/refresh_token', refreshTokenController, checkJwtMiddleware)
}
