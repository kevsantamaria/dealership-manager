import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { DashboardService } from '@/services/dashboard.service'
import type { Request, Response } from 'express'

const dashboardService = new DashboardService()

export class DashboardController {
  getStockSummary = async (req: Request, res: Response) => {
    const summaryVehicles = await dashboardService.getStockSummary()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: summaryVehicles,
    })
  }

  getFinancialSummary = async (req: Request, res: Response) => {
    const summary = await dashboardService.getFinancialSummary()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: summary,
    })
  }

  getMonthlyFinancialHistory = async (req: Request, res: Response) => {
    const history = await dashboardService.getMonthlyFinancialHistory()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: history,
    })
  }

  getTopSellingQuarterly = async (req: Request, res: Response) => {
    const sells = await dashboardService.getTopSellingQuarterly()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: sells,
    })
  }

  getOldInventoryReport = async (req: Request, res: Response) => {
    const oldInventory = await dashboardService.getOldInventoryReport()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: oldInventory,
    })
  }

  getRecentActivity = async (req: Request, res: Response) => {
    const recentActivity = await dashboardService.getRecentActivity()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: recentActivity,
    })
  }
}
