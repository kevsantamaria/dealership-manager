import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import {
  getFinancialSummaryService,
  getMonthlyFinancialHistoryService,
  getTopSellingQuarterlyService,
  getVehiclesStockSummaryService,
} from '@/services/dashboard.service'
import type { Request, Response } from 'express'

export const getVehiclesStockSummary = async (req: Request, res: Response) => {
  const summaryVehicles = await getVehiclesStockSummaryService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: summaryVehicles,
  })
}

export const getFinancialSummary = async (req: Request, res: Response) => {
  const summary = await getFinancialSummaryService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: summary,
  })
}

export const getMonthlyFinancialHistory = async (
  req: Request,
  res: Response
) => {
  const history = await getMonthlyFinancialHistoryService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: history,
  })
}

export const getTopSellingQuarterly = async (req: Request, res: Response) => {
  const sells = await getTopSellingQuarterlyService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: sells,
  })
}
