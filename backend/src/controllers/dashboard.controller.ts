import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "@/constants/httpStatus"
import { findVehiclesStockSummary } from "@/repositories/vehicle.repository"
import type { Request, Response } from "express"

export const getVehiclesStockSummary = async (req:Request, res: Response) => {
    const summaryVehicles = await findVehiclesStockSummary()
      res.status(HTTP_STATUS.OK).json({
        message: HTTP_STATUS_MESSAGE.OK,
        data: summaryVehicles,
      })
}
