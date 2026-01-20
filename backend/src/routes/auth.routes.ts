import { Router } from 'express'
import { login } from '@/controllers/login.controller'
import { authenticate } from '@/middlewares/autenticate.meddleware'
import { logout } from '@/controllers/logout.controller'

const router = Router()

router.post('/login', login)
router.post('/logout', authenticate, logout)

export default router
