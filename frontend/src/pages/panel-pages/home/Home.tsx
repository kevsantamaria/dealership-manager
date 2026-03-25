import { useDashboard } from '@/hooks/useDashboard'
import { FinancialCards } from '@/pages/panel-pages/home/components/FinancialSummary'
import MonthlyFinancialChart from '@/pages/panel-pages/home/components/MonthlyFinancialChart'
import RecentActivityTable from '@/pages/panel-pages/home/components/RecentActivityTable'
import VehiclesInStock from '@/pages/panel-pages/home/components/VehiclesInStock'
import OldInventoryRecord from './components/OldInventoryRecord'
import QuickActions from './components/QuickActions'
import TopSellingModels from './components/TopSellingModels'

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
  if (getTopSellingQuarterly.isLoading) {
    return <div>Loading...</div>
  }
  if (getOldInventoryReport.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <VehiclesInStock data={getVehiclesStockSummary.data} />
        <FinancialCards data={getFinancialSummary.data} />
      </div>
      <MonthlyFinancialChart data={getMonthlyFinancialHistory.data} />
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <RecentActivityTable data={getRecentActivity.data} />
        <QuickActions />
      </div>
      <div className="flex gap-4 flex-col sm:flex-row justify-center">
        <OldInventoryRecord data={getOldInventoryReport.data} />
        <TopSellingModels data={getTopSellingQuarterly.data} />
      </div>
    </section>
  )
}

export default Home
