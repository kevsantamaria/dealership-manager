import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { useSuppliers } from '@/hooks/useSuppliers'
import { steps } from '@/pages/panel-pages/add-vehicle/components/data/formData'
import type { Supplier } from '@/types/supplier'
import {
  colorOptions,
  mappedColorOptions,
  mappedConditions,
  mappedDriveTrains,
  mappedEngineTypes,
  mappedStockStatusValues,
  mappedTransmissionTypes,
} from '@/validations/enums'
import { vehicleSchema, type VehicleSchema } from '@/validations/vehicleSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function AddVehicleForm() {
  const { getSuppliersWithNameAndId } = useSuppliers()
  const { data } = getSuppliersWithNameAndId
  const suppliers: Supplier[] = data

  const [currentStep, setCurrentStep] = useState(0)

  const currentForm = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vin: '',
      arrivalDate: '',
      image: '',
      licensePlate: '',
      mileage: '',
      purchasePrice: '',
      suggestedPrice: '',
      rateDescription: '',
      supplierId: '',
      stockStatus: 'in_stock',
      rateCondition: 'good',
      color: colorOptions[0],
      brand: {
        name: '',
        countryOrigin: '',
      },
      trim: {
        drivetrain: 'fwd',
        engineType: 'gasoline',
        transmission: 'automatic',
      },
      model: {
        name: '',
        launchYear: '',
      },
    },
    mode: 'onChange',
  })

  const handleNextButton = async () => {
    const currentFields = steps[currentStep].fields

    const isValid = await form.trigger(currentFields)

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (values: VehicleSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('Vehículo agregado satisfactoriamente')
    console.log(values)
  }

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0: {
        return (
          <FieldGroup>
            <Controller
              name="vin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="vin">VIN *</FieldLabel>
                  <Input
                    {...field}
                    id="vin"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="licensePlate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="licensePlate">Matrícula</FieldLabel>
                  <Input
                    {...field}
                    id="licensePlate"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="arrivalDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="arrivalDate">
                    Fecha de importación *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="arrivalDate"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    type="date"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="stockStatus"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="stockStatus">
                      Disponibilidad *
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="stockStatus"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Disponibilidad actual</SelectLabel>
                            {Object.entries(mappedStockStatusValues).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        )
      }

      case 1: {
        return (
          <FieldGroup>
            <Controller
              name="rateCondition"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="rateCondition">Condición *</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="rateCondition"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Condición general</SelectLabel>
                            {Object.entries(mappedConditions).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            <Controller
              name="rateDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rateDescription">
                    Descripción general
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="rateDescription"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="mileage"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mileage">Kilometraje *</FieldLabel>
                  <Input
                    {...field}
                    id="mileage"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="color">Color *</FieldLabel>
                    <Select
                      name={field.name}
                      defaultValue={field.value[0]}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="color"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Selecciona un color</SelectLabel>
                            {Object.entries(mappedColorOptions).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        )
      }

      case 2: {
        return (
          <FieldGroup>
            <Controller
              name="purchasePrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="purchasePrice">
                    Precio de compra * (en dólares)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="purchasePrice"
                    aria-invalid={fieldState.invalid}
                    type="number"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="suggestedPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="suggestedPrice">
                    Precio de venta * (en dólares)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="suggestedPrice"
                    aria-invalid={fieldState.invalid}
                    type="number"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )
      }

      case 3: {
        return (
          <FieldGroup>
            <Controller
              name="brand.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="brand.name">Marca *</FieldLabel>
                  <Input
                    {...field}
                    id="brand.name"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="brand.countryOrigin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="brand.countryOrigin">
                    País de origen
                  </FieldLabel>
                  <Input
                    {...field}
                    id="brand.countryOrigin"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="model.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="model.name">Modelo</FieldLabel>
                  <Input
                    {...field}
                    id="model.name"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="model.launchYear"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="model.launchYear">
                    Año de lanzamiento
                  </FieldLabel>
                  <Input
                    {...field}
                    id="model.launchYear"
                    aria-invalid={fieldState.invalid}
                    type="number"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="trim.name">Versión</FieldLabel>
                  <Input
                    {...field}
                    id="trim.name"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.engineSize"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="trim.engineSize">
                    Tamaño del motor
                  </FieldLabel>
                  <Input
                    {...field}
                    id="trim.engineSize"
                    aria-invalid={fieldState.invalid}
                    type="number"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.engineType"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="trim.engineType">
                      Tipo de combustible
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="trim.engineType"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              Seleccione un tipo de combustible
                            </SelectLabel>
                            {Object.entries(mappedEngineTypes).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            <Controller
              name="trim.transmission"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="trim.transmission">
                      Transmisión
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="trim.transmission"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Seleccione la Transmisión</SelectLabel>
                            {Object.entries(mappedTransmissionTypes).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            <Controller
              name="trim.horsepower"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="trim.horsepower">
                    Caballos de fuerza
                  </FieldLabel>
                  <Input
                    {...field}
                    id="trim.horsepower"
                    aria-invalid={fieldState.invalid}
                    type="number"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.drivetrain"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="trim.drivetrain">
                      Tren de potencia
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="trim.drivetrain"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              Seleccione tren de potencia
                            </SelectLabel>
                            {Object.entries(mappedDriveTrains).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        )
      }

      case 4: {
        return (
          <FieldGroup>
            <Controller
              name="supplierId"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="supplierId">Proveedor</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="supplierId"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Seleccione un proveedor</SelectLabel>
                            {suppliers.map((supplier) => (
                              <SelectItem
                                key={supplier.id}
                                value={String(supplier.id)}
                              >
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    <FieldDescription></FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">URL imagen</FieldLabel>
                  <Input
                    {...field}
                    id="image"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )
      }

      default: {
        return null
      }
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>{currentForm.title}</CardTitle>
            <p className="text-muted-foreground text-xs">
              Paso {currentStep + 1} de {steps.length}
            </p>
          </div>
          <CardDescription>{currentForm.description}</CardDescription>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <form id="multi-form" onSubmit={form.handleSubmit(onSubmit)}>
          {renderCurrentStepContent()}
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-between" orientation="horizontal">
          {currentStep > 0 && (
            <Button type="button" variant="ghost" onClick={handleBackButton}>
              <IconChevronLeft /> Anterior
            </Button>
          )}
          {!isLastStep && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleNextButton}
            >
              Siguiente
              <IconChevronRight />
            </Button>
          )}
          {isLastStep && (
            <Button
              type="submit"
              form="multi-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : 'Agregar'}
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}

export default AddVehicleForm
