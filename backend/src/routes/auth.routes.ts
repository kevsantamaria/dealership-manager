import { Router } from 'express'
import { AuthController } from '@/controllers/auth.controller'
import { authenticate } from '@/middlewares/autenticate.middleware'
import { logout } from '@/controllers/logout.controller'
import { UserRepository } from '@/repositories/user.repository'
import { AuthService } from '@/services/auth.service'

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
const router = Router()

router.post('/login', authController.login)
// router.get('/me', authenticate, authController.me)
router.post('/logout', authenticate, logout)

export default router
