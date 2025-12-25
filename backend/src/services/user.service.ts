import type { User } from '@/models/user'
import { FindAllUsers } from '@/repositories/user.repository'
import { getErrorMessage } from '@/utils/getErorMessage'

export const getAllUsersService = async () => {
  try {
    const users: User[] = await FindAllUsers()
    return users
  } catch (error) {
    throw new Error(`Failed to retrieve users: ${getErrorMessage(error)}`)
  }
}
