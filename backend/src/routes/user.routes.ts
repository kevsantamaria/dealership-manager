import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/controllers/user.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamDTO } from '@/models/dtos/idParam.dto'
import { createUserDTO, updateUserDTO } from '@/models/dtos/user.dto'
import { Router } from 'express'

const router = Router()

router.post('/users', dtoValidator(createUserDTO, 'body'), createUser)
router.get('/users', getAllUsers)
router.get('/users/:id', dtoValidator(idParamDTO, 'params'), getUserById)
router.patch(
  '/users/:id',
  dtoValidator(updateUserDTO, 'body'),
  dtoValidator(idParamDTO, 'params'),
  updateUser
)
router.delete('/users/:id', dtoValidator(idParamDTO, 'params'), deleteUser)

export default router
