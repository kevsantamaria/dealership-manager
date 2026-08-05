export type Vehicle = {
  id: number
  brand: string
  model: string
  trim: string
  color: string
  launchYear: number
  suggestedPrice: string
  stockStatus: string
}

export type CreateVehiclePayload = {
  vin: string
  licensePlate?: string
  arrivalDate: string
  stockStatus: string
  rateCondition: string
  rateDescription?: string
  mileage?: number
  color: string
  purchasePrice: number
  suggestedPrice: number
  supplierId: number

  brand: {
    name: string
    countryOrigin?: string
  }

  model: {
    name: string
    launchYear: number
  }

  trim: {
    name: string
    engineSize: number
    engineType: string
    transmission: string
    horsepower: number
    drivetrain: string
  }

  image?: string
}

export type VehicleDetailsType = {
  id: number
  vin: string
  color: string
  arrivalDate: Date
  licensePlate: string
  mileage: string
  purchasePrice: string
  suggestedPrice: string
  rateCondition: string
  rateDescription: string
  stockStatus: string
  image: File | null
  createdAt: Date
  updatedAt: Date

  supplier: {
    name: string
    type: string
    contact: string
    country: string
  }

  trim: {
    name: string
    drivetrain: string
    engineSize: string
    horsepower: number
    engineType: string
    transmission: string

    model: {
      name: string
      launchYear: number

      brand: {
        name: string
        countryOrigin: string
      }
    }
  }
}

export type UpdateVehiclePayload = {
  vin?: string
  licensePlate?: string
  arrivalDate?: Date
  stockStatus?: string
  rateCondition?: string
  rateDescription?: string
  mileage?: number
  color?: string
  purchasePrice?: number
  suggestedPrice?: number
  supplierId?: number
  trimId?: number
}

export type StockFilter = 'all' | 'in_stock' | 'reserved' | 'sold'
