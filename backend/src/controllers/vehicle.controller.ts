import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type { CreateVehicleDTO, UpdateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { createVehicleService, deleteVehicleService, getAllVehiclesService, getVehicleByIdService, updateVehicleService } from '@/services/vehicle.service'
import type { Request, Response } from 'express'

export const createVehicle = async (req: Request, res: Response) => {
    const vehicle: CreateVehicleDTO = req.body
    const createdVehicle = await createVehicleService(vehicle)
    res.status(HTTP_STATUS.CREATED).json({message: HTTP_STATUS_MESSAGE.CREATED,
        data: createdVehicle,})
}

export const getAllVehicles = async (req: Request, res: Response) => {
  const vehicles = await getAllVehiclesService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: vehicles,
  })
}

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params
  const vehicle = await getVehicleByIdService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: vehicle,
  })
}

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params
  const vehicle: UpdateVehicleDTO = req.body

  const updatedVehicle = await updateVehicleService(Number(id), vehicle)
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS.OK,
    data: updatedVehicle,
  })
}

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteVehicleService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
  })
}
