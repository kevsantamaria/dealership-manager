import type { CreateUserDTO } from '@/models/dtos/user.dto'
import type { User } from '@/models/entities/user'
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from '@/repositories/user.repository'
import { getErrorMessage } from '@/utils/getErorMessage'

export const getAllUsersService = async () => {
  try {
    const users: User[] = await findAllUsers()
    return users
  } catch (error) {
    throw new Error(`Failed to retrieve users: ${getErrorMessage(error)}`)
  }
}

export const getUserByIdService = async (id: number) => {
  try {
    const user: User = await findUserById(id)
    return user
  } catch (error) {
    throw new Error(
      `Failed to retrieve user with ID ${id}: ${getErrorMessage(error)}`
    )
  }
}

export const createUserService = async (user: CreateUserDTO) => {
  try {
    const now = new Date().toISOString()
    const userToCreate: Omit<User, 'id'> = {
      ...user,
      createdAt: now,
      updatedAt: now,
    }

    const createdUser: User = await createUser(userToCreate)
    return createdUser
  } catch (error) {
    throw new Error(`Failed to create user: ${getErrorMessage(error)}`)
  }
}

export const deleteUserService = async (id: number) => {
  try {
    await deleteUser(id)
  } catch (error) {
    throw new Error(
      `Failed to delete user with ID ${id}: ${getErrorMessage(error)}`
    )
  }
}

export const updateUserService = async (id: number, user: Partial<User>) => {
  try {
    const now = new Date().toISOString()
    const userToUpdate: Partial<User> = {
      ...user,
      updatedAt: now,
    }

    const updatedUser = await updateUser(id, userToUpdate)
    return updatedUser[0]
  } catch (error) {
    throw new Error(`Failed to update user: ${getErrorMessage(error)}`)
  }
}
