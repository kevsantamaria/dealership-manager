import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'
import { UserService } from '@/services/user.service'
import type { Request, Response } from 'express'

export class UserController {
  constructor(private userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const user: CreateUserDTO = req.body
    const createdUser = await this.userService.create(user)
    res.status(201).json({
      message: 'CREATED',
      data: createdUser,
    })
  }

  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll()
    res.status(200).json({
      message: 'OK',
      data: users,
    })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await this.userService.getById(Number(id))
    res.status(200).json({
      message: 'OK',
      data: user,
    })
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const user: UpdateUserDTO = req.body
    const updatedUser = await this.userService.update(Number(id), user)
    res.status(200).json({
      message: 'OK',
      data: updatedUser,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await this.userService.delete(Number(id))
    res.status(200).json({
      message: 'OK',
    })
  }
}
