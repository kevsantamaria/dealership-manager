export type Vehicle = {
  vehicleId: number
  color: string
  price: string
  stockStatus: string
  brand: string
  model: string
  launchYear: number
  trim: string
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

export type VehicleDetails = {
  vehicleId: number

  vin: string
  brandName: string
  brandCountryOrigin: string

  modelName: string
  trimName: string
  modelLaunchYear: number

  color: string

  engineType: string
  engineSize: string
  horsepower: number
  transmission: string
  drivetrain: string

  mileage: string
  licensePlate: string

  purchasePrice: string
  suggestedPrice: string

  stockStatus: string
  rateCondition: string
  rateDescription: string

  arrivalDate: string

  supplierName: string
  supplierType: string
  supplierCountry: string
  supplierContact: string

  createdAt: string
  updatedAt: string
}
