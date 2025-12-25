import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
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
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(error.issues.map(i => ({ message: i.message })))
      }
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR })
    }
  }
