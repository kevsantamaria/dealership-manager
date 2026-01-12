import {
  findFinancialSummary,
  findMonthlyFinancialHistory,
  findOldInventoryReport,
  findTopSellingQuarterly,
  findVehiclesStockSummary,
} from '@/repositories/vehicle.repository'

export const getVehiclesStockSummaryService = async () => {
  const vehicles = await findVehiclesStockSummary()
  return vehicles
}

export const getFinancialSummaryService = async () => {
  const summary: { purchasePriceTotal: number; suggestedPriceTotal: number } =
    await findFinancialSummary()
  if (!summary) {
    return {
      purchasePriceTotal: 0,
      suggestedPriceTotal: 0,
    }
  }
  const { purchasePriceTotal, suggestedPriceTotal } = summary
  const revenue = suggestedPriceTotal - purchasePriceTotal

  return {
    ...summary,
    revenue,
  }
}

export const getMonthlyFinancialHistoryService = async () => {
  const history = await findMonthlyFinancialHistory()
  return history
}

export const getTopSellingQuarterlyService = async () => {
    const sells = await findTopSellingQuarterly()
    return sells
}

export const getOldInventoryReportService = async () => {
    const oldInventory = await findOldInventoryReport()
    return oldInventory
}
