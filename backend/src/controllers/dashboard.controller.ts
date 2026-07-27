import { DashboardService } from '@/services/dashboard.service'
import type { Request, Response } from 'express'

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getStockSummary = async (req: Request, res: Response) => {
    const summaryVehicles = await this.dashboardService.getStockSummary()
    res.status(200).json({
      message: 'OK',
      data: summaryVehicles,
    })
  }

  getFinancialSummary = async (req: Request, res: Response) => {
    const summary = await this.dashboardService.getFinancialSummary()
    res.status(200).json({
      message: 'OK',
      data: summary,
    })
  }

  getMonthlyFinancialHistory = async (req: Request, res: Response) => {
    const history = await this.dashboardService.getMonthlyFinancialHistory()
    res.status(200).json({
      message: 'OK',
      data: history,
    })
  }

  getTopSellingQuarterly = async (req: Request, res: Response) => {
    const sells = await this.dashboardService.getTopSellingQuarterly()
    res.status(200).json({
      message: 'OK',
      data: sells,
    })
  }

  getOldInventoryReport = async (req: Request, res: Response) => {
    const oldInventory = await this.dashboardService.getOldInventoryReport()
    res.status(200).json({
      message: 'OK',
      data: oldInventory,
    })
  }

  getRecentActivity = async (req: Request, res: Response) => {
    const recentActivity = await this.dashboardService.getRecentActivity()
    res.status(200).json({
      message: 'OK',
      data: recentActivity,
    })
  }
}
