import { VehicleController } from '@/controllers/vehicle.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import {
  createVehicleSchema,
  updateVehicleSchema,
} from '@/models/schemas/vehicle.schema'
import { BrandRepository } from '@/repositories/brand.repository'
import { ModelRepository } from '@/repositories/model.repository'
import { TrimRepository } from '@/repositories/trim.repository'
import { VehicleRepository } from '@/repositories/vehicle.repository'
import { VehicleService } from '@/services/vehicle.service'
import { Router } from 'express'

const vehicleRepository = new VehicleRepository()
const brandRepository = new BrandRepository()
const modelRepository = new ModelRepository()
const trimRepository = new TrimRepository()
const vehicleService = new VehicleService(
  vehicleRepository,
  brandRepository,
  modelRepository,
  trimRepository
)
const vehicleController = new VehicleController(vehicleService)
const router = Router()

router.post(
  '/vehicles',
  dtoValidator(createVehicleSchema, 'body'),
  vehicleController.create
)
router.get('/vehicles', vehicleController.getAll)
router.get(
  '/vehicles/:id',
  dtoValidator(idParamSchema, 'params'),
  vehicleController.getById
)
router.patch(
  '/vehicles/:id',
  dtoValidator(updateVehicleSchema, 'body'),
  dtoValidator(idParamSchema, 'params'),
  vehicleController.update
)
router.delete(
  '/vehicles/:id',
  dtoValidator(idParamSchema, 'params'),
  vehicleController.delete
)

export default router
