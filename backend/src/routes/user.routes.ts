import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/controllers/user.controller'
import { authenticate } from '@/middlewares/autenticate.meddleware'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { requireAdmin } from '@/middlewares/role.middleware'
import { idParamDTO } from '@/models/dtos/idParam.dto'
import { createUserDTO, updateUserDTO } from '@/models/dtos/user.dto'
import { Router } from 'express'

const router = Router()

router.post('/users', authenticate, requireAdmin,  dtoValidator(createUserDTO, 'body'), createUser)
router.get('/users', authenticate, requireAdmin, getAllUsers)
router.get('/users/:id', authenticate, requireAdmin, dtoValidator(idParamDTO, 'params'), getUserById)
router.patch(
  '/users/:id',
  authenticate, requireAdmin,
  dtoValidator(updateUserDTO, 'body'),
  dtoValidator(idParamDTO, 'params'),
  updateUser
)
router.delete('/users/:id', authenticate, requireAdmin, dtoValidator(idParamDTO, 'params'), deleteUser)

export default router
