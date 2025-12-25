import { getAllVehiclesService } from '@/services/vehicle.service'
import type { Request, Response } from 'express'

export const getAllVehicles = async (req: Request, res: Response) => {
  const vehicles = await getAllVehiclesService()

  res.json(vehicles)
}
