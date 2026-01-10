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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { mappedTypes } from '@/enums/supplierFormEnums'
import { useSuppliers } from '@/hooks/useSuppliers'
import { defaultValues } from '@/pages/panel-pages/add-supplier/data/supplierFormDefaultValues'
import { Controller, useForm } from 'react-hook-form'

function AddSupplierForm() {
  const { postSupplier } = useSuppliers()
  const { mutateAsync, error, isError, isPending } = postSupplier

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    mode: 'onChange',
    shouldUnregister: false,
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log('SUBMIT VALUES', values)
      await mutateAsync(values)
      reset()
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Supplier</CardTitle>
          </div>
          <CardDescription>
            Suppliersddsdddsd das sad dsad ddssadddassdaddsa sasad{' '}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form id="multi-form" onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 50,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nombre *</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contact"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 50,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact">Contacto *</FieldLabel>
                  <Input
                    {...field}
                    id="contact"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <FieldDescription>
                    Correo electrónico, teléfono celular u otro medio de
                    contacto
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 1,
                maxLength: 50,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="country">País *</FieldLabel>
                  <Input
                    {...field}
                    id="country"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <FieldDescription>
                    Sede o país donde opera el proveedor
                  </FieldDescription>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="type"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tipo de proveedor *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
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
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-end" orientation="horizontal">
          <Button type="submit" form="multi-form" disabled={isPending}>
            {isPending ? <Spinner /> : 'Agregar'}
          </Button>
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

export default AddSupplierForm
