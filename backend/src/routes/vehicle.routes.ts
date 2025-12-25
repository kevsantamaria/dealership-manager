import { getAllVehicles } from '@/controllers/vehicle.controller'
import { Router } from 'express'

const router = Router()

router.get('/vehicles', getAllVehicles)

export default router
