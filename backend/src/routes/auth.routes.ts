import { Router } from 'express'
import { AuthController } from '@/controllers/auth.controller'
import { authenticate } from '@/middlewares/autenticate.middleware'
import { logout } from '@/controllers/logout.controller'

const authController = new AuthController()
const router = Router()

router.post('/login', authController.login)
// router.get('/me', authenticate, authController.me)
router.post('/logout', authenticate, logout)

export default router
