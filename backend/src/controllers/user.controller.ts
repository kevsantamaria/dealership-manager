import type { User } from '@/models/entities/user'
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from '@/services/user.service'
import type { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  const user = req.body
  const createdUser = await createUserService(user)
  res.json({
    message: 'User created successfully',
    data: createdUser,
  })
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersService()
  console.log(users)
  res.json(users)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await getUserByIdService(Number(id))
  res.json({
    message: 'User retrieved successfully',
    data: user,
  })
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user: Partial<User> = req.body

  const updatedUser = await updateUserService(Number(id), user)
  res.json({
    message: 'User updated successfully',
    data: updatedUser,
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteUserService(Number(id))
  res.json({
    message: 'User deleted successfully',
  })
}
