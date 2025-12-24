import { pool } from '@/db/pool'
import type { Request, Response } from 'express'

export const createUser = (req: Request, res: Response) => {
  res.send('Creating a user')
}

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await pool`SELECT * FROM users`
  console.log(result)

  res.json(result)
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
