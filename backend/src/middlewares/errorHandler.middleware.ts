/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import type { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.message) {
    case 'NOT_FOUND':
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: HTTP_STATUS_MESSAGE.NOT_FOUND })

    case 'USERNAME_ALREADY_EXISTS':
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: 'Username already exists',
      })

    case 'VEHICLE_ALREADY_EXISTS':
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: 'Vehicle already exists',
      })

    case 'SUPPLIER_ALREADY_EXISTS':
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: 'Supplier already exists',
      })

    case 'NO_FIELDS_TO_UPDATE':
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'No fields provided to update',
      })

    case 'INVALID_CREDENTIALS':
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: 'Invalid username or password',
      })

    default:
      console.error(err)
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      })
  }
}
