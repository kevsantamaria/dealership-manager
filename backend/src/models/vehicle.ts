export type StockStatus =
  | 'in_stock'
  | 'reserved'
  | 'sold'

export type RateCondition =
  | 'bad'
  | 'regular'
  | 'good'
  | 'excellent'

export interface Vehicle {
  id: number
  vin: number
  licensePlate?: string | null
  color: string
  mileage?: number | null
  arrivalDate: string
  purchasePrice: number
  suggestedPrice: number
  stockStatus: StockStatus
  rateCondition: RateCondition
  rateDescription?: string | null
  createdAt: string
  updatedAt: string
  trimId: number
  supplierId: number
}
