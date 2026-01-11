import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import {
  mappedColors,
  mappedConditions,
  mappedDriveTrains,
  mappedEngineTypes,
  mappedStockStatusValues,
  mappedTransmissionTypes,
} from '@/enums/vehicleFormEnums'
import { useSuppliers } from '@/hooks/useSuppliers'
import { useVehicles } from '@/hooks/useVehicles'
import { cn } from '@/lib/utils'
import { steps } from '@/pages/panel-pages/add-vehicle/components/data/vehicleFormData'
import { defaultValues } from '@/pages/panel-pages/add-vehicle/components/data/vehicleFormDefaultValues'
import type { SupplierWithNameAndId } from '@/types/supplier'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function AddVehicleForm() {
  const { getSuppliersWithNameAndId } = useSuppliers()
  const suppliers: SupplierWithNameAndId[] =
    getSuppliersWithNameAndId.data || []
  const { postVehicle } = useVehicles()
  const { mutateAsync, error, isError, isPending } = postVehicle

  const [currentStep, setCurrentStep] = useState(0)

  const currentForm = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const parseLocalDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const { reset, handleSubmit, control, trigger } = useForm({
    defaultValues,
    mode: 'onChange',
    shouldUnregister: false,
  })

  const handleNextButton = async () => {
    const currentFields = steps[currentStep].fields
    const isValid = await trigger(currentFields)

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log('SUBMIT VALUES', values)
      await mutateAsync(values)
      toast.success('Vehículo agregado satisfactoriamente')
      reset()
      setCurrentStep(0)
    } catch (err) {
      toast.error(error?.message || 'Error al agregar el vehículo')
      console.error(err)
    }
  })

  const renderCurrentStepContent = () => {
    return (
      <>
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
          <FieldGroup>
            <Controller
              name="vin"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 17,
                maxLength: 17,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="vin">VIN *</FieldLabel>
                  <Input
                    {...field}
                    id="vin"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <FieldDescription>
                    Identificador único del vehículo, debe tener 17 caracteres
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="licensePlate"
              control={control}
              rules={{ maxLength: 10 }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="licensePlate">Matrícula</FieldLabel>
                  <Input
                    {...field}
                    id="licensePlate"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <FieldDescription>
                    Número de matrícula del vehículo, máximo 10 caracteres
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="arrivalDate"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Fecha de importación *</FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <IconCalendar className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(parseLocalDate(field.value), 'PPP', {
                              locale: es,
                            })
                          : 'Seleccionar fecha'}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? parseLocalDate(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, 'yyyy-MM-dd') : null
                          )
                        }}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="stockStatus"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Disponibilidad *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedStockStatusValues).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <FieldGroup>
            <Controller
              name="rateCondition"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Condición *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedConditions).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Condición general del vehículo
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rateDescription"
              control={control}
              rules={{ maxLength: 225 }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Descripción</FieldLabel>
                  <Textarea {...field} autoComplete="off" spellCheck="false" />
                  <FieldDescription>
                    Observaciones sobre la condición del vehículo
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="mileage"
              control={control}
              rules={{ required: 'Este campo es obligatorio', maxLength: 9 }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kilometraje *</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <FieldDescription>
                    Distancia total recorrida por el vehículo (si es nuevo, es
                    cero)
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="color"
              control={control}
              rules={{ required: 'Seleccione un color' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Color *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedColors).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <FieldGroup>
            <Controller
              name="purchasePrice"
              control={control}
              rules={{ required: 'Este campo es obligatorio', maxLength: 9 }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="purchasePrice">
                    Precio de compra *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="purchasePrice"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FieldDescription>
                    Precio de compra en dólares
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="suggestedPrice"
              control={control}
              rules={{ required: 'Este campo es obligatorio', maxLength: 9 }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="suggestedPrice">
                    Precio de venta *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="suggestedPrice"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FieldDescription>
                    Precio de venta en dólares
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
          <FieldGroup>
            {/* BRAND */}
            <Controller
              name="brand.name"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 60,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Marca *</FieldLabel>
                  <Input {...field} autoComplete="off" spellCheck="false" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="brand.countryOrigin"
              control={control}
              rules={{ maxLength: 60 }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>País de origen</FieldLabel>
                  <Input {...field} autoComplete="off" spellCheck="false" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* MODEL */}
            <Controller
              name="model.name"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 60,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Modelo *</FieldLabel>
                  <Input {...field} autoComplete="off" spellCheck="false" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="model.launchYear"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                min: {
                  value: 1886,
                  message: 'Año inválido',
                },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Año de lanzamiento *</FieldLabel>
                  <Input
                    type="number"
                    autoComplete="off"
                    spellCheck="false"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* TRIM */}
            <Controller
              name="trim.name"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 60,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Versión *</FieldLabel>
                  <Input {...field} autoComplete="off" spellCheck="false" />
                  <FieldDescription>
                    Versión específica del modelo
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.engineSize"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                min: { value: 0.1, message: 'Debe ser mayor que 0' },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tamaño del motor *</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    autoComplete="off"
                    spellCheck="false"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FieldDescription>
                    Cilindrada del motor, medida en litros (L)
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.engineType"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo de combustible *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedEngineTypes).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.transmission"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Transmisión *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedTransmissionTypes).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.horsepower"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                min: { value: 1, message: 'Debe ser mayor que 0' },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Caballos de fuerza *</FieldLabel>
                  <Input
                    type="number"
                    autoComplete="off"
                    spellCheck="false"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="trim.drivetrain"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tren de potencia *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedDriveTrains).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Conjunto de piezas que aplica la fuerza del motor a las
                    ruedas para mover un vehículo
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div style={{ display: currentStep === 4 ? 'contents' : 'none' }}>
          <FieldGroup>
            <Controller
              name="supplierId"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Proveedor *</FieldLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>URL imagen</FieldLabel>
                  <Input {...field} autoComplete="off" spellCheck="false" />
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </>
    )
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
        <form id="multi-form" onSubmit={onSubmit}>
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
            <Button type="submit" form="multi-form" disabled={isPending}>
              {isPending ? <Spinner /> : 'Agregar'}
            </Button>
          )}
        </Field>
        {isError && (
          <p className="text-sm text-destructive text-center">
            {error.message}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

export default AddVehicleForm
