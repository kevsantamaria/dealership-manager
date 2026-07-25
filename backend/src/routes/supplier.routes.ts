import { SupplierController } from '@/controllers/supplier.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import {
  createSupplierSchema,
  updateSupplierSchema,
} from '@/models/schemas/supplier.schema'
import { Router } from 'express'

const supplierController = new SupplierController()
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
