export const defaultValues = {
  vin: '',
  licensePlate: '',
  arrivalDate: '',
  stockStatus: 'in_stock',
  rateCondition: 'good',
  rateDescription: '',
  mileage: 0,
  color: '',
  purchasePrice: 0,
  suggestedPrice: 0,
  brand: {
    name: '',
    countryOrigin: '',
  },
  model: {
    name: '',
    launchYear: 2025,
  },
  trim: {
    name: '',
    engineSize: 0,
    engineType: 'gasoline',
    transmission: 'automatic',
    horsepower: 0,
    drivetrain: 'fwd',
  },
  supplierId: 0,
  image: '',
}

export type FormValues = typeof defaultValues
