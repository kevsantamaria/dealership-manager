import { TrimController } from '@/controllers/trim.controller'
import { TrimRepository } from '@/repositories/trim.repository'
import { TrimService } from '@/services/trim.service'
import { Router } from 'express'

const trimRepository = new TrimRepository()
const trimService = new TrimService(trimRepository)
const trimController = new TrimController(trimService)
const router = Router()

router.get('/trims-by-name-id', trimController.getNamesAndIds)

export default router
