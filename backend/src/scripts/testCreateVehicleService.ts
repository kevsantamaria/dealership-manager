import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { createVehicleService } from '@/services/vehicle.service'

const testVehicle: CreateVehicleDTO = {
  vin: '1HGCM82633A123456',
  color: 'Blue',
  arrivalDate: '2024-06-15',
  purchasePrice: 18500,
  suggestedPrice: 22500,
  stockStatus: 'reserved',
  rateCondition: 'excellent',
  supplierId: 6,
  brand: {
    name: 'Honda',
    countryOrigin: 'Japan',
  },
  model: {
    name: 'Civic',
    launchYear: 2022,
  },
  trim: {
    name: 'Touring',
    engineSize: 1.5,
    horsepower: 180,
    engineType: 'hybrid',
    transmission: 'cvt',
    drivetrain: 'fwd',
  },
}

async function run() {
  const vehicle = await createVehicleService(testVehicle)
  console.log(vehicle)
}

run().catch(console.error)
