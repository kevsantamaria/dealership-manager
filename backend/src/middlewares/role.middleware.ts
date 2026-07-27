import type { Request, Response, NextFunction } from 'express'

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.role !== 'admin') {
    return res.status(403).json({
      message: 'FORBIDDEN',
    })
  }

  next()
}
