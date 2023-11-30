import { AuthorizeController } from '../controllers/auth/AuthorizeControler'
import { CallbackController } from '../controllers/auth/CallbackController'
import { IRouter } from '../http/interfaces/IRouter'

const authorizeController = new AuthorizeController()
const callbackController = new CallbackController()

export async function authRoutes(router: IRouter) {
  router.get('/auth/authorize', authorizeController)
  router.get('/auth/callback', callbackController)
}
