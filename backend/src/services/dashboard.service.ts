import { DashboardRepository } from '@/repositories/dashboard.repository'
import type {
  FinancialSummary,
  MonthlyFinancialHistory,
  OldStockVehicle,
  RecentActivity,
  StockSummary,
  TopSellingQuarterly,
} from '@/types/dashboard.types'

export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}

  async getStockSummary(): Promise<StockSummary> {
    return await this.dashboardRepository.getStockSummary()
  }

  async getFinancialSummary(): Promise<FinancialSummary> {
    const { _sum } = await this.dashboardRepository.getFinancialSummary()

    const purchasePriceTotal = _sum.purchasePrice || 0
    const suggestedPriceTotal = _sum.suggestedPrice || 0

    return {
      purchasePriceTotal,
      suggestedPriceTotal,
      revenue: suggestedPriceTotal - purchasePriceTotal,
    }
  }

  async getMonthlyFinancialHistory(): Promise<MonthlyFinancialHistory[]> {
    return await this.dashboardRepository.getMonthlyFinancialHistory()
  }

  async getTopSellingQuarterly(): Promise<TopSellingQuarterly[]> {
    return await this.dashboardRepository.getTopSellingQuarterly()
  }

  async getOldInventoryReport(): Promise<OldStockVehicle[]> {
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const vehicles =
      await this.dashboardRepository.getOldStockVehicles(ninetyDaysAgo)
    const today = new Date()

    return vehicles.map((v) => ({
      brand: v.trim.model.brand.name,
      model: v.trim.model.name,
      trim: v.trim.name,
      arrivalDate: v.arrivalDate,
      suggestedPrice: v.suggestedPrice,
      daysInStock: Math.floor(
        (today.getTime() - v.arrivalDate.getTime()) / (1000 * 60 * 60 * 24)
      ),
    }))
  }

  async getRecentActivity(limit: number = 5): Promise<RecentActivity[]> {
    const activities = await this.dashboardRepository.getRecentActivities(limit)

    return activities.map((v) => ({
      vehicleName: `${v.trim.model.brand.name} ${v.trim.model.name} (${v.trim.name})`,
      status: v.stockStatus,
      date: v.updatedAt,
    }))
  }
}
