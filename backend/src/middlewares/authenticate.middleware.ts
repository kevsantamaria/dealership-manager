import type { Request, Response, NextFunction } from 'express'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.session

  if (!userId) {
    console.warn('[Auth] Unauthorized request from:', req.ip)
    return res.status(401).json({
      message: 'NOT_AUTHENTICATED',
    })
  }

  next()
}
