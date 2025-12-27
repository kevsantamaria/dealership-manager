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
import bcrypt from 'bcryptjs'

export const createUserService = async (user: CreateUserDTO) => {
  const { username, password } = user

  const validUser = await findUserByUsername(username)
  if (validUser) throw new Error('USERNAME_ALREADY_EXISTS')

  const hashPassword = await bcrypt.hash(password, 10)
  const now = new Date().toISOString()
  const userToCreate: Omit<User, 'id'> = {
    ...user,
    password: hashPassword,
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
  if (!existingUser) throw new Error('USER_NOT_FOUND')

  if (Object.keys(user).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  const { username, password } = user
  const userToUpdate: Partial<User> = {}

  // validate username
  if (typeof username !== 'undefined') {
    if (username.trim() === '') {
      throw new Error('NO_FIELDS_TO_UPDATE')
    }

    const userWithSameUsername = await findUserByUsername(username)
    if (userWithSameUsername && userWithSameUsername.id !== id) {
      throw new Error('USERNAME_ALREADY_EXISTS')
    }
    userToUpdate.username = username
  }

  // validate password
  if (typeof password !== 'undefined') {
    if (password.trim() === '') {
      throw new Error('PASSWORD_CANNOT_BE_EMPTY')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    userToUpdate.password = hashedPassword
  }

  userToUpdate.updatedAt = new Date().toISOString()

  const updatedUser = await updateUser(id, userToUpdate)
  return updatedUser[0]
}

export const deleteUserService = async (id: number) => {
  const existingUser = await findUserById(id)
  if (!existingUser) throw new Error('USER_NOT_FOUND')

  await deleteUser(id)
}
