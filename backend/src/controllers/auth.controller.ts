import type { Request, Response } from 'express'
import { AuthService } from '@/services/auth.service'
import type { LoginUser } from '@/models/entities/user.entity'
import { UnauthorizedError } from '@/errors/UnauthorizedError'

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const user: LoginUser = req.body

    const { loggedUser } = await this.authService.login(user)

    req.session.regenerate(() => {
      req.session.userId = loggedUser.id
      req.session.username = loggedUser.username
      req.session.role = loggedUser.role

      res.status(200).json({
        message: 'Login successfully',
        data: loggedUser,
      })
    })
  }

  logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' })
      }

      res.clearCookie('dealership-manager.sid')
      return res.status(200).json({ message: 'Logout successfully' })
    })
  }

  me = async (req: Request, res: Response) => {
    if (!req.session.userId) {
      throw new UnauthorizedError('User not authenticated')
    }

    return res.status(200).json({
      data: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
      },
    })
  }
}
