import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getAllSuppliersWithNameAndId,
  getSupplierById,
  updateSupplier,
} from '@/controllers/supplier.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamDTO } from '@/models/dtos/idParam.dto'
import {
  createSupplierDTO,
  updateSupplierDTO,
} from '@/models/dtos/supplier.dto'
import { Router } from 'express'

const router = Router()

router.post(
  '/suppliers',
  dtoValidator(createSupplierDTO, 'body'),
  createSupplier
)
router.get('/suppliers', getAllSuppliers)
router.get('/suppliers/names-and-ids', getAllSuppliersWithNameAndId)
router.get(
  '/suppliers/:id',
  dtoValidator(idParamDTO, 'params'),
  getSupplierById
)
router.patch(
  '/suppliers/:id',
  dtoValidator(updateSupplierDTO, 'body'),
  dtoValidator(idParamDTO, 'params'),
  updateSupplier
)
router.delete(
  '/suppliers/:id',
  dtoValidator(idParamDTO, 'params'),
  deleteSupplier
)

export default router
