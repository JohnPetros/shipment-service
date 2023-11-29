import { AuthController } from '../controllers/AuthController'
import { IRouter } from '../http/interfaces/IRouter'

const authController = new AuthController()

export async function authRoutes(router: IRouter) {
  router.get('/', authController)
}
