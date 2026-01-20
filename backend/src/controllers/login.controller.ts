import type { Request, Response } from 'express'
import { loginService } from '@/services/login.service'
import type { LoginUser } from '@/models/entities/user'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { env } from 'bun'

export const login = async (req: Request, res: Response) => {
    const user: LoginUser = req.body

    const { user: loggedUser, sessionId } = await loginService(user)

    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    })

    // 3️⃣ responder
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: loggedUser,
    })
}
