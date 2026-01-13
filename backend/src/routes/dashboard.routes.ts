import {
  getVehiclesStockSummary,
  getFinancialSummary,
  getMonthlyFinancialHistory,
  getOldInventoryReport,
  getRecentActivity,
  getTopSellingQuarterly,
} from '@/controllers/dashboard.controller'
import { Router } from 'express'

const router = Router()

router.get('/dashboard/stock-summary', getVehiclesStockSummary)
router.get('/dashboard/financial-summary', getFinancialSummary)
router.get('/dashboard/monthly-history', getMonthlyFinancialHistory)
router.get('/dashboard/old-inventory', getOldInventoryReport)
router.get('/dashboard/recent', getRecentActivity)
router.get('/dashboard/top-selling', getTopSellingQuarterly)

export default router
