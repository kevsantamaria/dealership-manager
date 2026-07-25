import { DashboardRepository } from '@/repositories/dashboard.repository'
import type { FinancialSummary } from '@/types/dashboard.types'

const dashboardRepository = new DashboardRepository()

export class DashboardService {
  async getStockSummary() {
    return await dashboardRepository.getStockSummary()
  }

  async getFinancialSummary(): Promise<FinancialSummary> {
    const { purchasePrice, suggestedPrice } =
      await dashboardRepository.getFinancialSummary()

    const purchasePriceTotal = Number(purchasePrice || 0)
    const suggestedPriceTotal = Number(suggestedPrice || 0)

    return {
      purchasePriceTotal,
      suggestedPriceTotal,
      revenue: suggestedPriceTotal - purchasePriceTotal,
    }
  }

  async getMonthlyFinancialHistory() {
    return await dashboardRepository.getMonthlyFinancialHistory()
  }

  async getTopSellingQuarterly() {
    return await dashboardRepository.getTopSellingQuarterly()
  }

  async getOldInventoryReport() {
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const vehicles = await dashboardRepository.getOldStockVehicles(
      ninetyDaysAgo
    )
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

  async getRecentActivity(limit: number = 5) {
    const activities = await dashboardRepository.getRecentActivities(limit)

    return activities.map((v) => ({
      vehicleName: `${v.trim.model.brand.name} ${v.trim.model.name} (${v.trim.name})`,
      status: v.stockStatus,
      date: v.updatedAt,
    }))
  }
}
