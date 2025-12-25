import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/controllers/user.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { createUserDTO } from '@/models/dtos/user.dto'
import { Router } from 'express'

const router = Router()

router.post('/users', dtoValidator(createUserDTO), createUser)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
