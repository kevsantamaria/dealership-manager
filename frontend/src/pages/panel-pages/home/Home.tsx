import { useDashboard } from '@/hooks/useDashboard'
import { FinancialCards } from './components/FinancialSummary'
import MonthlyFinancialChart from './components/MonthlyFinancialChart'
import RecentActivityTable from './components/RecentActivityTable'
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
  if (getMonthlyFinancialHistory.isLoading) {
    return <div>Loading...</div>
  }
  if (getRecentActivity.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-4 justify-center">
        <VehiclesInStock data={getVehiclesStockSummary.data} />
        <FinancialCards data={getFinancialSummary.data} />
      </div>
      <MonthlyFinancialChart data={getMonthlyFinancialHistory.data} />
      <RecentActivityTable data={getRecentActivity.data} />
    </section>
  )
}

export default Home
