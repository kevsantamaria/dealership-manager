import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { EnumSelect } from '@/shared/components/ui/enum-select'
import { Spinner } from '@/shared/components/ui/spinner'
import { mappedTypes, types } from '../enums/supplier-form-enums'
import { useSuppliers } from '../hooks/use-suppliers'
import { defaultValues } from './data/form-default-values'
import { Controller, useForm } from 'react-hook-form'
import { createSubmitHandler } from '@/shared/utils/submit-handler'

function AddSupplierForm() {
  const { add } = useSuppliers()
  const { mutateAsync, error, isError, isPending } = add

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    mode: 'onChange',
    shouldUnregister: false,
  })

  const onSubmit = handleSubmit(
    createSubmitHandler({
      mutateAsync,
      successText: 'Proveedor',
      errorText: 'proveedor',
      onSuccess: () => reset(),
    })
  )

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Proveedor</CardTitle>
          </div>
          <CardDescription>
            Añade un nuevo proveedor de vehículos.
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
                minLength: 2,
                maxLength: 60,
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
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingrese un correo electrónico válido',
                },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="contacto@proveedor.com"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="telephone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="telephone">Teléfono</FieldLabel>
                  <Input
                    {...field}
                    id="telephone"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="+1 234 567 890"
                  />
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
                minLength: 2,
                maxLength: 60,
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
                  <EnumSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    options={types}
                    labels={mappedTypes}
                    placeholder="Seleccione un tipo"
                  />
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
