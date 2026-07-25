import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'
import { UserService } from '@/services/user.service'
import type { Request, Response } from 'express'

const userService = new UserService()

export class UserController {
  create = async (req: Request, res: Response) => {
    const user: CreateUserDTO = req.body
    const createdUser = await userService.create(user)
    res.status(HTTP_STATUS.CREATED).json({
      message: HTTP_STATUS_MESSAGE.CREATED,
      data: createdUser,
    })
  }

  getAll = async (req: Request, res: Response) => {
    const users = await userService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: users,
    })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await userService.getById(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: user,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const user: UpdateUserDTO = req.body
    const updatedUser = await userService.update(Number(id), user)
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: updatedUser,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await userService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
