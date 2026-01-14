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

export type MonthData = {
  month: string
  totalPurchased: number
  totalSoldRevenue: number
}

export type RecentActivity = {
  vehicleName: string
  status: string
  date: string
}

export type TopSellingModel = {
  brand: string
  model: string
  trim: string
  unitsSold: number
  revenue: number
}

export type OldInventoryItem = {
  brand: string
  model: string
  trim: string
  arrivalDate: string
  suggestedPrice: number
  daysInStock: number
}
