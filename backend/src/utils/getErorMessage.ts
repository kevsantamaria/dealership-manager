import { ZodError } from "zod"

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ZodError) return error.issues.map(i => ({message: i.message}))
}
