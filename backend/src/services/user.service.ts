import { prisma } from '@/lib/prisma'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/dtos/user.dto'
import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const createUserService = async (user: CreateUserDTO) => {
  const { username, password, role } = user

  const validUser = await prisma.user.findFirst({
    where: { username: username },
  })
  if (validUser) throw new Error('USERNAME_ALREADY_EXISTS')

  const hashPassword = await bcrypt.hash(password, 10)
  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
      role,
    },
  })
  return createdUser
}

export const getAllUsersService = async () => {
  return await prisma.user.findMany()
}

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } })
  if (!user) throw new Error('NOT_FOUND')

  return user
}

export const updateUserService = async (id: number, user: UpdateUserDTO) => {
  const existingUser = await prisma.user.findUnique({ where: { id: id } })
  if (!existingUser) throw new Error('NOT_FOUND')

  const { username, password, role } = user
  const userToUpdate: Partial<User> = {}

  if (username !== undefined && username.trim() !== '') {
    const userWithSameUsername = await prisma.user.findFirst({
      where: { username: username },
    })
    if (userWithSameUsername && userWithSameUsername.id !== id) {
      throw new Error('USERNAME_ALREADY_EXISTS')
    }
    userToUpdate.username = username
  }

  if (role !== undefined) {
    userToUpdate.role = role
  }

  if (password && password.trim() !== '') {
    const hashedPassword = await bcrypt.hash(password, 10)
    userToUpdate.password = hashedPassword
  }

  if (Object.keys(userToUpdate).length === 0) {
    throw new Error('NO_FIELDS_TO_UPDATE')
  }

  userToUpdate.updatedAt = new Date()
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userToUpdate,
  })
  return updatedUser
}

export const deleteUserService = async (id: number) => {
  const existingUser = await prisma.user.findUnique({ where: { id: id } })
  if (!existingUser) throw new Error('NOT_FOUND')

  await prisma.user.delete({ where: { id } })
}
