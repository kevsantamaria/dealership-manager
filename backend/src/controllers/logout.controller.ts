import type { Request, Response } from 'express'
import { deleteSession } from '@/sessions/session.store'

export const logout = (req: Request, res: Response) => {
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
