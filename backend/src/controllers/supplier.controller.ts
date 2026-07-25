import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierService } from '@/services/supplier.service'
import type { Request, Response } from 'express'

export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  async create(req: Request, res: Response) {
    const supplier: CreateSupplierDTO = req.body
    const createdSupplier = await this.supplierService.create(supplier)
    res.status(HTTP_STATUS.CREATED).json({
      message: HTTP_STATUS_MESSAGE.CREATED,
      data: createdSupplier,
    })
  }

  async getAll(req: Request, res: Response) {
    const suppliers = await this.supplierService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: suppliers,
    })
  }

  async getAllNamesAndIds(req: Request, res: Response) {
    const suppliers = await this.supplierService.getAllNamesAndIds()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: suppliers,
    })
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const supplier = await this.supplierService.getById(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: supplier,
    })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const supplier: UpdateSupplierDTO = req.body
    const updatedSupplier = await this.supplierService.update(
      Number(id),
      supplier
    )
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: updatedSupplier,
    })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await this.supplierService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
