import { VehicleController } from '@/controllers/vehicle.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import {
  createVehicleSchema,
  updateVehicleSchema,
} from '@/models/schemas/vehicle.schema'
import { VehicleRepository } from '@/repositories/vehicle.repository'
import { VehicleService } from '@/services/vehicle.service'
import { Router } from 'express'

const vehicleRepository = new VehicleRepository()
const vehicleService = new VehicleService(vehicleRepository)
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
