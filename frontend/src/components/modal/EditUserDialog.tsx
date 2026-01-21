import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IconLoader2, IconPencil } from '@tabler/icons-react'

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
  
  // Asumiendo que tu hook useUsers tiene una mutación similar a la de proveedores
  const {  } = useUsers()
  const { mutateAsync, isPending } = updateUserById

  const { control, reset, register, handleSubmit } = useForm<UserData>({
    defaultValues: user,
  })

  // Resetear el formulario cada vez que se abre con los datos actuales del usuario
  useEffect(() => {
    if (open) reset(user)
  }, [open, user, reset])

  const onSubmit = async (data: UserData) => {
    try {
      // Ajusta los parámetros según cómo reciba tu API la actualización
      await mutateAsync({ id: userId, userData: data })
      setOpen(false)
    } catch (err) {
      console.error('Error al actualizar usuario:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* El botón que dispara el modal (el lápiz de la tabla) */}
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="h-8 w-8 text-blue-600">
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuario Estándar</SelectItem>
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