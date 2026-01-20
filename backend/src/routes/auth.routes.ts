import { Router } from 'express'
import { login, me } from '@/controllers/auth.controller'
import { authenticate } from '@/middlewares/autenticate.meddleware'
import { logout } from '@/controllers/logout.controller'

const router = Router()

router.post('/login', login)
router.get('/me', authenticate, me)
router.post('/logout', authenticate, logout)

export default router
