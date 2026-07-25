import { SupplierController } from '@/controllers/supplier.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import {
  createSupplierSchema,
  updateSupplierSchema,
} from '@/models/schemas/supplier.schema'
import { SupplierRepository } from '@/repositories/supplier.repository'
import { SupplierService } from '@/services/supplier.service'
import { Router } from 'express'

const supplierRepository = new SupplierRepository()
const supplierService = new SupplierService(supplierRepository)
const supplierController = new SupplierController(supplierService)
const router = Router()

router.post(
  '/suppliers',
  dtoValidator(createSupplierSchema, 'body'),
  supplierController.create
)
router.get('/suppliers', supplierController.getAll)
router.get('/suppliers/names-and-ids', supplierController.getAllNamesAndIds)
router.get(
  '/suppliers/:id',
  dtoValidator(idParamSchema, 'params'),
  supplierController.getById
)
router.patch(
  '/suppliers/:id',
  dtoValidator(updateSupplierSchema, 'body'),
  dtoValidator(idParamSchema, 'params'),
  supplierController.update
)
router.delete(
  '/suppliers/:id',
  dtoValidator(idParamSchema, 'params'),
  supplierController.delete
)

export default router
