import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierService } from '@/services/supplier.service'
import type { Request, Response } from 'express'

export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  create = async (req: Request, res: Response) => {
    const supplier: CreateSupplierDTO = req.body
    const createdSupplier = await this.supplierService.create(supplier)
    res.status(201).json({
      message: 'CREATED',
      data: createdSupplier,
    })
  }

  getAll = async (req: Request, res: Response) => {
    const suppliers = await this.supplierService.getAll()
    res.status(200).json({
      message: 'OK',
      data: suppliers,
    })
  }

  getAllNamesAndIds = async (req: Request, res: Response) => {
    const suppliers = await this.supplierService.getAllNamesAndIds()
    res.status(200).json({
      message: 'OK',
      data: suppliers,
    })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const supplier = await this.supplierService.getById(Number(id))
    res.status(200).json({
      message: 'OK',
      data: supplier,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const supplier: UpdateSupplierDTO = req.body
    const updatedSupplier = await this.supplierService.update(
      Number(id),
      supplier
    )
    res.status(200).json({
      message: 'OK',
      data: updatedSupplier,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await this.supplierService.delete(Number(id))
    res.status(200).json({
      message: 'OK',
    })
  }
}
