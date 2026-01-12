import { findVehiclesStockSummary } from "@/repositories/vehicle.repository"

export const getVehiclesStockSummaryService = async () => {
  const vehicles = await findVehiclesStockSummary()
  
  return vehicles
}