/* eslint-disable @typescript-eslint/no-explicit-any */
export const manageError = (error: any) => {
  const errorMsg = error.response?.data?.message || 'Unknown error ocurred'
  console.error(errorMsg)
  throw new Error(errorMsg)
}
