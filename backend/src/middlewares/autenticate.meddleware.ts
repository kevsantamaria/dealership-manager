import type { Request, Response, NextFunction } from 'express'
import { getSession } from '@/sessions/session.store'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.cookies?.session_id

  if (!sessionId) {
    return res.status(401).json({
      message: 'NOT_AUTHENTICATED',
    })
  }

  const session = getSession(sessionId)

  if (!session) {
    return res.status(401).json({
      message: 'INVALID_SESSION',
    })
  }

  // 🔑 inyectamos la sesión
  req.user = session

  next()
}
