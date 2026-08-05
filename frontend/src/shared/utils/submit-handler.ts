import { toast } from 'sonner'

type CreateSubmitHandlerOptions<T> = {
  mutateAsync: (values: T) => Promise<any>
  successText: string
  errorText: string
  onSuccess: () => void
}

export function createSubmitHandler<T>({
  mutateAsync,
  successText,
  errorText,
  onSuccess,
}: CreateSubmitHandlerOptions<T>) {
  return async (values: T) => {
    try {
      await mutateAsync(values)
      toast.success(`${successText} agregado correctamente`)
      onSuccess()
    } catch (error) {
      toast.error(`Error al agregar el ${errorText}`)
      console.log(error)
    }
  }
}
