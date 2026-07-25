import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'
import { UserService } from '@/services/user.service'
import type { Request, Response } from 'express'

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const user: CreateUserDTO = req.body
    const createdUser = await this.userService.create(user)
    res.status(HTTP_STATUS.CREATED).json({
      message: HTTP_STATUS_MESSAGE.CREATED,
      data: createdUser,
    })
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: users,
    })
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const user = await this.userService.getById(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: user,
    })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const user: UpdateUserDTO = req.body
    const updatedUser = await this.userService.update(Number(id), user)
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: updatedUser,
    })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await this.userService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
