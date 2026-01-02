import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle } from '@/controllers/vehicle.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamDTO } from '@/models/dtos/idParam.dto'
import { createVehicleDTO, updateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { Router } from 'express'

const router = Router()

router.post('/vehicles', dtoValidator(createVehicleDTO, 'body'), createVehicle)
router.get('/vehicles', getAllVehicles)
router.get('/vehicles/:id', dtoValidator(idParamDTO, 'params'), getVehicleById)
router.patch(
  '/vehicles/:id',
  dtoValidator(updateVehicleDTO, 'body'),
  dtoValidator(idParamDTO, 'params'),
  updateVehicle
)
router.delete('/vehicles/:id', dtoValidator(idParamDTO, 'params'), deleteVehicle)

export default router
