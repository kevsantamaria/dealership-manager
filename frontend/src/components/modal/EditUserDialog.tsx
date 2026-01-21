import { IconLoader2, IconPencil } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useUsers } from '@/hooks/useUsers'
import type { UpdateUserPayload } from '@/types/user'

interface EditUserDialogProps {
  userId: number
  user: UpdateUserPayload
}

function EditUserDialog({ userId, user }: EditUserDialogProps) {
  const [open, setOpen] = useState(false)

  const { updateUserById } = useUsers()
  const { mutateAsync, isPending } = updateUserById

  const { control, reset, register, handleSubmit } = useForm<UpdateUserPayload>(
    {
      defaultValues: user,
    }
  )

  useEffect(() => {
    if (open) reset(user)
  }, [open, user, reset])

  const onSubmit = async (data: UpdateUserPayload) => {
    try {
      const payload = {
        username: data.username,
        role: data.role,
      }
      await mutateAsync({ id: userId, user: payload })
      setOpen(false)
    } catch (err) {
      console.error('Error al actualizar usuario:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-8 w-8 text-primary"
      >
        <IconPencil className="size-4" />
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifica las credenciales o el nivel de acceso del usuario.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 gap-4">
            <Field>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                {...register('username', { required: true })}
                placeholder="Ej. admin_sales"
              />
            </Field>

            <Field>
              <Label htmlFor="role">Rol / Permisos</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <IconLoader2 className="mr-2 size-4 animate-spin" />
              )}
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
