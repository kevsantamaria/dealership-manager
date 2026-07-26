import type { Request, Response } from 'express'
import { AuthService } from '@/services/auth.service'
import type { LoginUser } from '@/models/entities/user.entity'
import { env } from 'bun'
import { deleteSession } from '@/sessions/session.store'
import { UnauthorizedError } from '@/errors/UnauthorizedError'

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const user: LoginUser = req.body

    const { user: loggedUser, sessionId } = await this.authService.login(user)

    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.status(200).json({
      message: 'Login successfully',
      data: loggedUser,
    })
  }

  async logout(req: Request, res: Response) {
    const sessionId = req.cookies?.session_id

    if (sessionId) {
      deleteSession(sessionId)
    }

    res.clearCookie('session_id', {
      path: '/',
    })

    return res.status(200).json({
      message: 'LOGOUT_OK',
    })
  }

  async me(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError('User not authenticated')

    return res.status(200).json({
      data: {
        id: req.user.userId,
        role: req.user.role,
      },
    })
  }
}
