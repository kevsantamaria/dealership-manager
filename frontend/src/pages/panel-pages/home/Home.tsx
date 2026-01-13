import { useDashboard } from '@/hooks/useDashboard'
import { FinancialCards } from './components/FinancialSummary'
import VehiclesInStock from './components/VehiclesInStock'

function Home() {
  const {
    getVehiclesStockSummary,
    getFinancialSummary,
    getMonthlyFinancialHistory,
    getOldInventoryReport,
    getRecentActivity,
    getTopSellingQuarterly,
  } = useDashboard()

  if (getVehiclesStockSummary.isLoading) {
    return <div>Loading...</div>
  }
  if (getFinancialSummary.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex gap-4 justify-center">
      <VehiclesInStock data={getVehiclesStockSummary.data} />
      <FinancialCards data={getFinancialSummary.data} />
    </div>
  )
}

export default Home
