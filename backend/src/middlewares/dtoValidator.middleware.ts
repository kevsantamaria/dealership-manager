import type { NextFunction, Request, Response } from 'express'
import { ZodError, type ZodType } from 'zod'

export const dtoValidator =
  (dto: ZodType, target: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      dto.parse(req[target])
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(error.issues.map((i) => ({ message: i.message })))
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
