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
import { mappedUserTypes } from '@/enums/userFormEnums'
import { useUsers } from '@/hooks/useUsers'
import type { CreateUserPayload } from '@/types/user'
import { Controller, useForm } from 'react-hook-form'

function UserForm() {
  const { handleSubmit, control, reset } = useForm<CreateUserPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { postUser } = useUsers()
  const { mutateAsync, isPending, error, isError } = postUser

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync(values)
      reset()
    } catch (error) {
      console.log(error)
    }
  })

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
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(mappedUserTypes).map(([key, value]) => (
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

export default UserForm
