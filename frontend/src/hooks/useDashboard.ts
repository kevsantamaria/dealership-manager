import {
  fetchFinancialSummary,
  fetchMonthlyFinancialHistory,
  fetchOldInventoryReport,
  fetchRecentActivity,
  fetchTopSellingQuarterly,
  fetchVehiclesStockSummary,
} from '@/api/endpoints/dashboard'
import { useQuery } from '@tanstack/react-query'

export const useDashboard = () => {
  const getVehiclesStockSummary = useQuery({
    queryKey: ['vehiclesStockSummary'],
    queryFn: () => fetchVehiclesStockSummary(),
  })

  const getFinancialSummary = useQuery({
    queryKey: ['financialSummary'],
    queryFn: () => fetchFinancialSummary(),
  })

  const getMonthlyFinancialHistory = useQuery({
    queryKey: ['monthlyFinancialHistory'],
    queryFn: () => fetchMonthlyFinancialHistory(),
  })

  const getOldInventoryReport = useQuery({
    queryKey: ['oldInventoryReport'],
    queryFn: () => fetchOldInventoryReport(),
  })

  const getRecentActivity = useQuery({
    queryKey: ['recentActivity'],
    queryFn: () => fetchRecentActivity(),
  })

  const getTopSellingQuarterly = useQuery({
    queryKey: ['topSellingQuarterly'],
    queryFn: () => fetchTopSellingQuarterly(),
  })

  return {
    getVehiclesStockSummary,
    getFinancialSummary,
    getMonthlyFinancialHistory,
    getOldInventoryReport,
    getRecentActivity,
    getTopSellingQuarterly,
  }
}
