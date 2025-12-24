import { getAllUsersService } from '@/services/user.service'
import type { Request, Response } from 'express'

export const createUser = (req: Request, res: Response) => {
  res.send('Creating a user')
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersService()
  console.log(users)
  res.json(users)
}

export const getUserById = (req: Request, res: Response) => {
  res.send('Getting user by ID')
}

export const updateUser = (req: Request, res: Response) => {
  res.send('Updating user')
}

export const deleteUser = (req: Request, res: Response) => {
  res.send('Deleting user')
}
