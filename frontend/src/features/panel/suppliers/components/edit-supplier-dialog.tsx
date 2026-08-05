import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Field, FieldGroup } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { EnumSelect } from '@/shared/components/ui/enum-select'
import { mappedTypes, types } from '../enums/supplier-form-enums'
import { useSuppliers } from '../hooks/use-suppliers'
import type { UpdateSupplierPayload } from '../types/supplier-types'
import { IconLoader2, IconPencil } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  supplierId: number
  supplier: UpdateSupplierPayload
}

function EditSupplierDialog({ supplierId, supplier }: Props) {
  const [open, setOpen] = useState(false)
  const { update } = useSuppliers()
  const { mutateAsync, isPending } = update

  const { control, reset, register, handleSubmit } =
    useForm<UpdateSupplierPayload>({
      defaultValues: supplier,
    })

  useEffect(() => {
    if (open) reset(supplier)
  }, [open, supplier, reset])

  const onSubmit = async (data: UpdateSupplierPayload) => {
    try {
      await mutateAsync({ id: supplierId, supplier: data })
      setOpen(false)
    } catch (err) {
      console.error('Error al actualizar:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <IconPencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>Editar Proveedor</DialogHeader>
        <DialogDescription>
          Modifica la información del proveedor.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label>Nombre</Label>
              <Input {...register('name')} placeholder="John Doe" />
            </Field>
            <Field>
              <Label>Correo electrónico</Label>
              <Input
                {...register('email')}
                placeholder="contacto@proveedor.com"
              />
            </Field>
            <Field>
              <Label>Teléfono</Label>
              <Input
                {...register('telephone')}
                placeholder="+1 234 567 890"
              />
            </Field>
            <Field>
              <Label>País</Label>
              <Input {...register('country')} placeholder="Alemania" />
            </Field>
            <Field>
              <Label>Tipo</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <EnumSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    options={types}
                    labels={mappedTypes}
                    placeholder="Seleccione un tipo"
                  />
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <IconLoader2 className="mr-4 animate-spin" />}
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditSupplierDialog
