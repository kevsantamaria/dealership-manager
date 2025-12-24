import { FindAllUsers } from '@/repositories/user.repository'

export const getAllUsersService = async () => {
  try {
    const users = await FindAllUsers()
    return users
  } catch (error) {
    throw new Error(`Failed to retrieve users: ${error.message}`)
  }
}
