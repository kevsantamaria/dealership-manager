import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierService } from '@/services/supplier.service'
import type { Request, Response } from 'express'

const supplierService = new SupplierService()

export class SupplierController {
  create = async (req: Request, res: Response) => {
    const supplier: CreateSupplierDTO = req.body
    const createdSupplier = await supplierService.create(supplier)
    res.status(HTTP_STATUS.CREATED).json({
      message: HTTP_STATUS_MESSAGE.CREATED,
      data: createdSupplier,
    })
  }

  getAll = async (req: Request, res: Response) => {
    const suppliers = await supplierService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: suppliers,
    })
  }

  getAllNamesAndIds = async (req: Request, res: Response) => {
    const suppliers = await supplierService.getAllNamesAndIds()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: suppliers,
    })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const supplier = await supplierService.getById(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: supplier,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const supplier: UpdateSupplierDTO = req.body
    const updatedSupplier = await supplierService.update(Number(id), supplier)
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: updatedSupplier,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await supplierService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
