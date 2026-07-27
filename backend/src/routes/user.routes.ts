import { UserController } from '@/controllers/user.controller'
import { authenticate } from '@/middlewares/authenticate.middleware'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { requireAdmin } from '@/middlewares/role.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import {
  createUserSchema,
  updateUserSchema,
} from '@/models/schemas/user.schema'
import { UserRepository } from '@/repositories/user.repository'
import { UserService } from '@/services/user.service'
import { Router } from 'express'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const router = Router()

router.post(
  '/users',
  authenticate,
  requireAdmin,
  dtoValidator(createUserSchema, 'body'),
  userController.create
)
router.get('/users', authenticate, requireAdmin, userController.getAll)
router.get(
  '/users/:id',
  authenticate,
  requireAdmin,
  dtoValidator(idParamSchema, 'params'),
  userController.getById
)
router.patch(
  '/users/:id',
  authenticate,
  requireAdmin,
  dtoValidator(updateUserSchema, 'body'),
  dtoValidator(idParamSchema, 'params'),
  userController.update
)
router.delete(
  '/users/:id',
  authenticate,
  requireAdmin,
  dtoValidator(idParamSchema, 'params'),
  userController.delete
)

export default router
