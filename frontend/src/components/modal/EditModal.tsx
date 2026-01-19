import { IconCalendar, IconLoader2, IconPencil } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  mappedColors,
  mappedConditions,
  mappedStockStatusValues,
} from '@/enums/vehicleFormEnums'
import { useVehicles } from '@/hooks/useVehicles'
import { cn } from '@/lib/utils'
import type { UpdateVehiclePayload } from '@/types/vehicle'
import { Field, FieldGroup } from '../ui/field'

interface Props {
  vehicleId: number
  vehicle: UpdateVehiclePayload
  suppliers: { id: string; name: string }[]
  trims: { id: string; name: string }[]
}

function EditVehicleDialog({ vehicleId, vehicle }: Props) {
  const [open, setOpen] = useState(false)
  const { updateVehicleById } = useVehicles()
  const { mutateAsync, isPending } = updateVehicleById

  const { register, handleSubmit, control, reset } =
    useForm<UpdateVehiclePayload>({
      defaultValues: vehicle,
    })

  useEffect(() => {
    if (open) reset(vehicle)
  }, [open, vehicle, reset])

  const onSubmit = async (data: UpdateVehiclePayload) => {
    try {
      console.log(data)
      await mutateAsync({ id: vehicleId, vehicle: data })
      setOpen(false)
    } catch (err) {
      console.error('Error al actualizar:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPencil className="mr-2 size-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Vehículo</DialogTitle>
          <DialogDescription>
            Modifica la información del vehículo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label>VIN</Label>
              <Input {...register('vin')} placeholder="VIN de 17 caracteres" />
            </Field>
            <Field>
              <Label>Matrícula</Label>
              <Input {...register('licensePlate')} placeholder="ABC-123" />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label>Color</Label>
              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                )}
              />
            </Field>
            <Field>
              <Label>Kilometraje</Label>
              <Input
                type="number"
                {...register('mileage', { valueAsNumber: true })}
              />
            </Field>
          </FieldGroup>

          <Field>
            <Label>Fecha de Llegada</Label>
            <Controller
              control={control}
              name="arrivalDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <IconCalendar className="mr-2 size-4" />
                      {field.value ? (
                        format(new Date(field.value), 'PPP', { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </Field>

          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label>Precio de Compra</Label>
              <Input
                type="number"
                {...register('purchasePrice', { valueAsNumber: true })}
              />
            </Field>
            <Field>
              <Label>Precio Sugerido</Label>
              <Input
                type="number"
                {...register('suggestedPrice', { valueAsNumber: true })}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label>Condición</Label>
              <Controller
                control={control}
                name="rateCondition"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                )}
              />
            </Field>
            <Field>
              <Label>Estado de Stock</Label>
              <Controller
                control={control}
                name="stockStatus"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                )}
              />
            </Field>
          </FieldGroup>

          <Field>
            <Label>Descripción</Label>
            <Textarea {...register('rateDescription')} rows={3} />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <IconLoader2 className="mr@tabler/icons-react-4 animate-spin" />
              )}
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditVehicleDialog
