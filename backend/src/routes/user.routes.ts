import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@/controllers/user.controller'
import { Router } from 'express'

const router = Router()

router.post('/users', createUser)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
