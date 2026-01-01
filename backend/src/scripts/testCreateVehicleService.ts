import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { createVehicleService } from '@/services/vehicle.service'

const testVehicle: CreateVehicleDTO = {
  vin: '12345A789012CH567',
  color: 'Red',
  mileage: null,
  arrivalDate: '2025-01-01',
  purchasePrice: 10000,
  suggestedPrice: 13000,
  stockStatus: 'in_stock',
  rateCondition: 'good',
  supplierId: 5,
  brand: {
    name: 'Toyota',
    countryOrigin: 'Japan',
  },
  model: {
    name: 'Corolla',
    launchYear: 2020,
  },
  trim: {
    name: 'SE',
    engineSize: 2.0,
    horsepower: 169,
    engineType: 'gasoline',
    transmission: 'automatic',
    drivetrain: 'fwd',
  },
}

async function run() {
  const vehicle = await createVehicleService(testVehicle)
  console.log(vehicle)
}

run().catch(console.error)
