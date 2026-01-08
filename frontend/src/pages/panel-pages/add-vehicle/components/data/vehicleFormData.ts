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
    description: '',
    fields: ['vin', 'licensePlate', 'arrivalDate', 'stockStatus'],
  },
  {
    title: 'Información física y condición',
    description: '',
    fields: ['rateCondition', 'rateDescription', 'mileage', 'color'],
  },
  {
    title: 'Información comercial',
    description: '',
    fields: ['purchasePrice', 'suggestedPrice'],
  },
  {
    title: 'Clasificación del vehículo',
    description: '',
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
    description: '',
    fields: ['supplierId', 'image'],
  },
]
