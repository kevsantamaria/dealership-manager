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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { EnumSelect } from '@/shared/components/ui/enum-select'
import { Spinner } from '@/shared/components/ui/spinner'
import { mappedUserTypes, userTypes } from '../enums/user-form-enums'
import { useUsers } from '../hooks/use-users'
import type { CreateUserPayload } from '../types/user-types'
import { Controller, useForm } from 'react-hook-form'
import { createSubmitHandler } from '@/shared/utils/submit-handler'

function AddUserForm() {
  const { handleSubmit, control, reset } = useForm<CreateUserPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { add } = useUsers()
  const { mutateAsync, isPending, error, isError } = add

  const onSubmit = handleSubmit(
    createSubmitHandler({
      mutateAsync,
      successText: 'Usuario',
      errorText: 'usuario',
      onSuccess: () => reset(),
    })
  )

  return (
    <Card className="w-150 max-w-full mx-auto">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Usuario</CardTitle>
          </div>
          <CardDescription>Añade un nuevo usuario.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form id="multi-form" onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 2,
                maxLength: 60,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Usuario *</FieldLabel>
                  <Input
                    {...field}
                    id="username"
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
              name="password"
              control={control}
              rules={{
                required: 'Este campo es obligatorio',
                minLength: 6,
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Contraseña *</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
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
              name="role"
              control={control}
              rules={{ required: 'Seleccione una opción' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Rol *</FieldLabel>
                  <EnumSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    options={userTypes}
                    labels={mappedUserTypes}
                    placeholder="Seleccione un rol"
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

export default AddUserForm
