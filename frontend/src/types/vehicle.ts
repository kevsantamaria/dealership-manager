export type Vehicle = {
  color: string
  price: string
  stockStatus: string
  brand: string
  model: string
  launchYear: number
  trim: string
}

export type AddVehicle = {
  vin: string;
  licensePlate: string | null;
  color: string;
  mileage: number | null;
  arrivalDate: string;
  purchasePrice: number;
  suggestedPrice: number;
  stockStatus: 'in_stock' | 'reserved' | 'sold';
  rateCondition: 'bad' | 'regular' | 'good' | 'excellent';
  rateDescription: string | null;
  supplierName: string;
  brandName: string;
  brandCountryOrigin: string | null;
  modelName: string;
  modelLaunchYear: number;
  trimName: string;
  engineSize: number;
  horsepower: number;
  engineType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'automatic' | 'manual' | 'cvt';
  drivetrain: 'fwd' | 'rwd' | 'awd';
}