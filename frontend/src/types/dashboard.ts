export type VehicleStockData = {
  inStock: number
  reserved: number
  sold: number
  total: string
}

export type FinancialSummaryData = {
  purchasePriceTotal: number
  suggestedPriceTotal: number
  revenue: number
}

export interface MonthData {
  month: string
  totalPurchased: number
  totalSoldRevenue: number
}
