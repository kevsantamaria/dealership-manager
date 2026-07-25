import type { Brand } from './brand.entity'
import type { Model } from './model.entity'
import type { Supplier } from './supplier.entity'
import type { Trim } from './trim.entity'

export type StockStatus = 'in_stock' | 'reserved' | 'sold'
export type RateCondition = 'bad' | 'regular' | 'good' | 'excellent'

export interface Vehicle {
  id: number
  vin: string
  licensePlate?: string | null
  color: string
  mileage?: number | null
  arrivalDate: Date
  purchasePrice: number
  suggestedPrice: number
  stockStatus: StockStatus
  rateCondition: RateCondition
  rateDescription?: string | null
  trimId: number
  supplierId: number
  createdAt: Date
  updatedAt: Date
}

export type VehicleListItem = Pick<
  Vehicle,
  | 'id'
  | 'color'
  | 'arrivalDate'
  | 'suggestedPrice'
  | 'stockStatus'
  | 'rateCondition'
> & {
  trim: Pick<Trim, 'name'> & {
    model: Pick<Model, 'name' | 'launchYear'> & {
      brand: Pick<Brand, 'name'>
    }
  }
}

export type VehicleWithDetails = Vehicle & {
  trim: Trim & {
    model: Model & {
      brand: Brand
    }
  }
  supplier: Supplier
}
