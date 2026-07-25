import { DashboardController } from '@/controllers/dashboard.controller'
import { DashboardRepository } from '@/repositories/dashboard.repository'
import { DashboardService } from '@/services/dashboard.service'
import { Router } from 'express'

const dashboardRepository = new DashboardRepository()
const dashboardService = new DashboardService(dashboardRepository)
const dashboardController = new DashboardController(dashboardService)
const router = Router()

router.get('/dashboard/stock-summary', dashboardController.getStockSummary)
router.get('/dashboard/financial-summary', dashboardController.getFinancialSummary)
router.get('/dashboard/monthly-history', dashboardController.getMonthlyFinancialHistory)
router.get('/dashboard/old-inventory', dashboardController.getOldInventoryReport)
router.get('/dashboard/recent', dashboardController.getRecentActivity)
router.get('/dashboard/top-selling', dashboardController.getTopSellingQuarterly)

export default router
