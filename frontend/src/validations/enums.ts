export const colors = [
  'amber',
  'black',
  'blue',
  'gray',
  'green',
  'orange',
  'red',
  'white',
  'yellow',
] as const

export type Colors = (typeof colors)[number]
export const mappedColors: { [key in Colors]: string } = {
  amber: 'Ambar',
  black: 'Negro',
  blue: 'Azul',
  gray: 'Gris',
  green: 'Verde',
  orange: 'Naranja',
  red: 'Rojo',
  white: 'Blanco',
  yellow: 'Amarillo',
}

export const stockStatusValues = ['in_stock', 'reserved', 'sold'] as const

export type StockStatusValues = (typeof stockStatusValues)[number]
export const mappedStockStatusValues: { [key in StockStatusValues]: string } = {
  in_stock: 'Disponible',
  reserved: 'Reservado',
  sold: 'Vendido',
}

export const conditions = ['bad', 'regular', 'good', 'excellent'] as const

export type Conditions = (typeof conditions)[number]
export const mappedConditions: { [key in Conditions]: string } = {
  bad: 'Mala',
  regular: 'Regular',
  good: 'Buena',
  excellent: 'Excelente',
}

export const engineTypes = ['gasoline', 'diesel', 'hybrid', 'electric'] as const

export type EngineTypes = (typeof engineTypes)[number]
export const mappedEngineTypes: { [key in EngineTypes]: string } = {
  gasoline: 'Gasolina',
  diesel: 'Petróleo',
  electric: 'Eléctrico',
  hybrid: 'Híbrido',
}

export const transmissionTypes = ['automatic', 'manual', 'cvt'] as const

export type TransmissionTypes = (typeof transmissionTypes)[number]
export const mappedTransmissionTypes: { [key in TransmissionTypes]: string } = {
  automatic: 'Automática',
  manual: 'Manual',
  cvt: 'CVT',
}

export const driveTrains = ['fwd', 'rwd', 'awd'] as const

export type DriveTrains = (typeof driveTrains)[number]
export const mappedDriveTrains: { [key in DriveTrains]: string } = {
  fwd: 'FWD',
  rwd: 'RWD',
  awd: 'AWD',
}
