import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/dtos/supplier.dto'
import {
  createSupplierService,
  deleteSupplierService,
  getAllSuppliersService,
  getAllSuppliersWithNameAndIdService,
  getSupplierByIdService,
  updateSupplierService,
} from '@/services/supplier.service'
import type { Request, Response } from 'express'

export const createSupplier = async (req: Request, res: Response) => {
  const supplier: CreateSupplierDTO = req.body
  const createdSupplier = await createSupplierService(supplier)
  res.status(HTTP_STATUS.CREATED).json({
    message: HTTP_STATUS_MESSAGE.CREATED,
    data: createdSupplier,
  })
}

export const getAllSuppliers = async (req: Request, res: Response) => {
  const suppliers = await getAllSuppliersService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: suppliers,
  })
}

export const getAllSuppliersWithNameAndId = async (
  req: Request,
  res: Response
) => {
  const suppliers = await getAllSuppliersWithNameAndIdService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: suppliers,
  })
}

export const getSupplierById = async (req: Request, res: Response) => {
  const { id } = req.params
  const supplier = await getSupplierByIdService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: supplier,
  })
}

export const updateSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  const supplier: UpdateSupplierDTO = req.body

  const updatedSupplier = await updateSupplierService(Number(id), supplier)
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS.OK,
    data: updatedSupplier,
  })
}

export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteSupplierService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
  })
}
