import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'
import { VehicleService } from '@/services/vehicle.service'
import type { Request, Response } from 'express'

const vehicleService = new VehicleService()

export class VehicleController {
  create = async (req: Request, res: Response) => {
    const vehicle: CreateVehicleDTO = req.body
    const createdVehicle = await vehicleService.create(vehicle)
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: HTTP_STATUS_MESSAGE.CREATED, data: createdVehicle })
  }

  getAll = async (req: Request, res: Response) => {
    const vehicles = await vehicleService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: vehicles,
    })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const vehicle = await vehicleService.getById(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: vehicle,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const vehicle: UpdateVehicleDTO = req.body
    const updatedVehicle = await vehicleService.update(Number(id), vehicle)
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: updatedVehicle,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await vehicleService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
