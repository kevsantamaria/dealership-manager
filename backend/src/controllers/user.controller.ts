import type { Request, Response } from 'express'

export const createUser = (req: Request, res: Response) => {
  res.send('Creating a user')
}
export const getAllUsers = (req: Request, res: Response) => {
  res.send('Getting all users')
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
