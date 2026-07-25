import type { Request, Response } from 'express'
import { AuthService } from '@/services/auth.service'
import type { LoginUser } from '@/models/entities/user.entity'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { env } from 'bun'

const authService = new AuthService()

export class AuthController {
  login = async (req: Request, res: Response) => {
    const user: LoginUser = req.body

    const { user: loggedUser, sessionId } = await authService.login(user)

    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: loggedUser,
    })
  }

  me = (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: HTTP_STATUS_MESSAGE.UNAUTHORIZED,
      })
    }

    return res.status(HTTP_STATUS.OK).json({
      data: {
        id: req.user.userId,
        role: req.user.role,
      },
    })
  }
}
