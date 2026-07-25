import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { DashboardService } from '@/services/dashboard.service'
import type { Request, Response } from 'express'

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getStockSummary = async (req: Request, res: Response) => {
    const summaryVehicles = await this.dashboardService.getStockSummary()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: summaryVehicles,
    })
  }

  getFinancialSummary = async (req: Request, res: Response) => {
    const summary = await this.dashboardService.getFinancialSummary()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: summary,
    })
  }

  getMonthlyFinancialHistory = async (req: Request, res: Response) => {
    const history = await this.dashboardService.getMonthlyFinancialHistory()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: history,
    })
  }

  getTopSellingQuarterly = async (req: Request, res: Response) => {
    const sells = await this.dashboardService.getTopSellingQuarterly()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: sells,
    })
  }

  getOldInventoryReport = async (req: Request, res: Response) => {
    const oldInventory = await this.dashboardService.getOldInventoryReport()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: oldInventory,
    })
  }

  getRecentActivity = async (req: Request, res: Response) => {
    const recentActivity = await this.dashboardService.getRecentActivity()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: recentActivity,
    })
  }
}
