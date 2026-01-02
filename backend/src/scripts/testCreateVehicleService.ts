import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { createVehicleService } from '@/services/vehicle.service'

const testVehicle: CreateVehicleDTO = {
  vin: '1G1ZC5E0XGF123789',
  color: 'Black',
  arrivalDate: '2024-09-10',
  purchasePrice: 32000,
  suggestedPrice: 37500,
  stockStatus: 'in_stock',
  rateCondition: 'bad',
  supplierId: 6,
  brand: {
    name: 'Chevrolet',
    countryOrigin: 'USA',
  },
  model: {
    name: 'Camaro',
    launchYear: 2021,
  },
  trim: {
    name: 'SS',
    engineSize: 6.2,
    horsepower: 455,
    engineType: 'gasoline',
    transmission: 'manual',
    drivetrain: 'rwd',
  },
}

async function run() {
  const vehicle = await createVehicleService(testVehicle)
  console.log(vehicle)
}

run().catch(console.error)
