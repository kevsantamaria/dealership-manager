import type { CreateUserDTO, UpdateUserDTO } from '@/models/dtos/user.dto'
import type { User } from '@/models/entities/user'
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByUsername,
  updateUser,
} from '@/repositories/user.repository'

export const createUserService = async (user: CreateUserDTO) => {
  const validUser = await findUserByUsername(user.username)
  if (validUser) throw new Error('USERNAME_ALREADY_EXISTS')

  const now = new Date().toISOString()
  const userToCreate: Omit<User, 'id'> = {
    ...user,
    createdAt: now,
    updatedAt: now,
  }

  const createdUser: User = await createUser(userToCreate)
  return createdUser
}

export const getAllUsersService = async () => {
  const users: User[] = await findAllUsers()
  return users
}

export const getUserByIdService = async (id: number) => {
  const user: User = await findUserById(id)

  if (!user) throw new Error('USER_NOT_FOUND')
  return user
}

export const updateUserService = async (id: number, user: UpdateUserDTO) => {
  const existingUser = await findUserById(id)

  if (typeof user.username !== 'undefined') {
    const validUser = await findUserByUsername(user.username)
    if (validUser && validUser.id !== id)
      throw new Error('USERNAME_ALREADY_EXISTS')
  }

  if (!existingUser) throw new Error('USER_NOT_FOUND')
  if (Object.keys(user).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  const now = new Date().toISOString()
  const userToUpdate: Partial<User> = {
    ...user,
    updatedAt: now,
  }

  const updatedUser = await updateUser(id, userToUpdate)
  return updatedUser[0]
}

export const deleteUserService = async (id: number) => {
  const existingUser = await findUserById(id)
  if (!existingUser) throw new Error('USER_NOT_FOUND')

  await deleteUser(id)
}
