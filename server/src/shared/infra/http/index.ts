/** @format */

import { AuthService } from '../../../modules/user/services/impl/auth.service'
import { Middlewares } from './utils/Middlewares'

const auth = new AuthService()
const middlewares = new Middlewares(auth)

export { middlewares }
