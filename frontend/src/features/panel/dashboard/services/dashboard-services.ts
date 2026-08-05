import { api } from '@/app/config/api/base'
import type {
  FinancialSummaryData,
  VehicleStockData,
  MonthData,
  OldInventoryItem,
  RecentActivity,
  TopSellingModel,
} from '../types/dashboard-types'

export const fetchVehiclesStockSummary =
  async (): Promise<VehicleStockData> => {
    return api('/dashboard/stock-summary')
  }

export const fetchFinancialSummary =
  async (): Promise<FinancialSummaryData> => {
    return api('/dashboard/financial-summary')
  }

export const fetchMonthlyFinancialHistory = async (): Promise<MonthData> => {
  return api('/dashboard/monthly-history')
}

export const fetchOldInventoryReport = async (): Promise<
  OldInventoryItem[]
> => {
  return api('/dashboard/old-inventory')
}

export const fetchRecentActivity = async (): Promise<RecentActivity> => {
  return api('/dashboard/recent')
}

export const fetchTopSellingQuarterly = async (): Promise<TopSellingModel> => {
  return api('/dashboard/top-selling')
}
