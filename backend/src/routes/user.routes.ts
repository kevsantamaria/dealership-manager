import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/controllers/user.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { createUserDTO, idParamDTO, updateUserDTO } from '@/models/dtos/user.dto'
import { Router } from 'express'

const router = Router()

router.post('/users', dtoValidator(createUserDTO, 'body'), createUser)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.patch('/users/:id', dtoValidator(updateUserDTO, 'body'), dtoValidator(idParamDTO, 'params'), updateUser)
router.delete('/users/:id', deleteUser)

export default router
