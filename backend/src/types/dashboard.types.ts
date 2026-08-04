export type StockSummary = {
  inStock: number
  reserved: number
  sold: number
  total: number
}

export type FinancialSummary = {
  purchasePriceTotal: number
  suggestedPriceTotal: number
  revenue: number
}

export type MonthlyFinancialHistory = {
  month: string
  totalPurchased: number
  totalSoldRevenue: number
}

export type TopSellingQuarterly = {
  brand: string
  model: string
  trim: string
  unitsSold: number
  revenue: number
}

export type OldStockVehicle = {
  arrivalDate: Date
  suggestedPrice: number
  trim: string
  model: string
  brand: string
  daysInStock: number
}

export type RecentActivity = {
  vehicleName: string
  status: string
  date: Date
}
