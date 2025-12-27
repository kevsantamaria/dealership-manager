import type { Request, Response } from 'express'
import { loginService } from '@/services/login.service'
import type { LoginUser } from '@/models/entities/user'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'

export const login = async (req: Request, res: Response) => {
  const user: LoginUser = req.body
  const loggedUser = await loginService(user)
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: loggedUser,
  })
}
