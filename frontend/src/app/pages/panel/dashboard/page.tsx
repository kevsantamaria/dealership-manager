import { useDashboard } from '@/features/panel/dashboard/hooks/use-dashboard'
import { FinancialCards } from '@/features/panel/dashboard/components/financial-summary'
import MonthlyFinancialChart from '@/features/panel/dashboard/components/monthly-financial-chart'
import RecentActivityTable from '@/features/panel/dashboard/components/recent-activity-table'
import OldInventoryRecord from '@/features/panel/dashboard/components/old-inventory-record'
import QuickActions from '@/features/panel/dashboard/components/quick-actions'
import TopSellingModels from '@/features/panel/dashboard/components/top-selling-models'
import VehiclesInStock from '@/features/panel/dashboard/components/vehicles-in-stock'

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
        {getVehiclesStockSummary.data && <VehiclesInStock data={getVehiclesStockSummary.data} />}
        {getFinancialSummary.data && <FinancialCards data={getFinancialSummary.data} />}
      </div>
      {getMonthlyFinancialHistory.data && <MonthlyFinancialChart data={getMonthlyFinancialHistory.data} />}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {getRecentActivity.data && <RecentActivityTable data={getRecentActivity.data} />}
        <QuickActions />
      </div>
      <div className="flex gap-4 flex-col sm:flex-row justify-center">
        {getOldInventoryReport.data && <OldInventoryRecord data={getOldInventoryReport.data} />}
        {getTopSellingQuarterly.data && <TopSellingModels data={getTopSellingQuarterly.data} />}
      </div>
    </section>
  )
}

export default Home
