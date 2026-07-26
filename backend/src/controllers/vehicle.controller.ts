import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'
import { VehicleService } from '@/services/vehicle.service'
import type { Request, Response } from 'express'

export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  async create(req: Request, res: Response) {
    const vehicle: CreateVehicleDTO = req.body
    const createdVehicle = await this.vehicleService.create(vehicle)
    res.status(201).json({ message: 'CREATED', data: createdVehicle })
  }

  async getAll(req: Request, res: Response) {
    const vehicles = await this.vehicleService.getAll()
    res.status(200).json({
      message: 'OK',
      data: vehicles,
    })
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const vehicle = await this.vehicleService.getById(Number(id))
    res.status(200).json({
      message: 'OK',
      data: vehicle,
    })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const vehicle: UpdateVehicleDTO = req.body
    const updatedVehicle = await this.vehicleService.update(Number(id), vehicle)
    res.status(200).json({
      message: 'OK',
      data: updatedVehicle,
    })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await this.vehicleService.delete(Number(id))
    res.status(200).json({
      message: 'OK',
    })
  }
}
