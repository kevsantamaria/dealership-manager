import type { CreateVehicleDTO } from "@/models/dtos/vehicle.dto";
import { findVehicleByVin } from "@/repositories/vehicle.repository";

export const createVehicleService = async (vehicle: CreateVehicleDTO) => {
  const {vin} = vehicle

  const validVin = await findVehicleByVin(vin)
  if (validVin) throw new Error('VEHICLE_ALREADY_EXISTS')
}
