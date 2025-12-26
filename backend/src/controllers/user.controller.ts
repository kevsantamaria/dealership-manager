import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/dtos/user.dto'
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from '@/services/user.service'
import type { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  const user: CreateUserDTO = req.body
  const createdUser = await createUserService(user)
  res.status(HTTP_STATUS.CREATED).json({
    message: HTTP_STATUS_MESSAGE.CREATED,
    data: createdUser,
  })
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: users,
  })

}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await getUserByIdService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: user,
  })
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user: UpdateUserDTO = req.body

  const updatedUser = await updateUserService(Number(id), user)
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS.OK,
    data: updatedUser,
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteUserService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
  })
}
