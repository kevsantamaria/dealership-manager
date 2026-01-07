export type Vehicle = {
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
