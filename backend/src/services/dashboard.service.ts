import {
  findFinancialSummary,
  findVehiclesStockSummary,
} from '@/repositories/vehicle.repository'

export const getVehiclesStockSummaryService = async () => {
  const vehicles = await findVehiclesStockSummary()

  return vehicles
}

export const getFinancialSummaryService = async () => {
  const summary: { purchasePriceTotal: number; suggestedPriceTotal: number } = await findFinancialSummary()
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
