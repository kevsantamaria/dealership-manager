import type { FormValues } from '@/pages/panel-pages/add-vehicle/components/data/vehicleFormDefaultValues'
import type { FieldPath } from 'react-hook-form'

type Step = {
  title: string
  description: string
  fields: FieldPath<FormValues>[]
}

export const steps: Step[] = [
  {
    title: 'Identificación',
    description: 'Datos básicos para identificar el vehículo.',
    fields: ['vin', 'licensePlate', 'arrivalDate', 'stockStatus'],
  },
  {
    title: 'Información física y condición',
    description: 'Información sobre el estado físico del vehículo.',
    fields: ['rateCondition', 'rateDescription', 'mileage', 'color'],
  },
  {
    title: 'Información comercial',
    description: 'Información sobre el precio de compra y venta del vehículo.',
    fields: ['purchasePrice', 'suggestedPrice'],
  },
  {
    title: 'Clasificación del vehículo',
    description:
      'Información sobre la marca, modelo y características técnicas del vehículo.',
    fields: [
      'brand.name',
      'brand.countryOrigin',
      'model.name',
      'model.launchYear',
      'trim.name',
      'trim.engineSize',
      'trim.engineType',
      'trim.transmission',
      'trim.horsepower',
      'trim.drivetrain',
    ],
  },
  {
    title: 'Origen y recursos',
    description: 'Proveedor de procedencia e imagen asociada al vehículo.',
    fields: ['supplierId', 'image'],
  },
]
