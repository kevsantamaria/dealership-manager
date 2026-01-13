import api from '@/api/dealership'
import { manageError } from '../manageError'

export const fetchVehiclesStockSummary = async () => {
  return api
    .get('/dashboard/stock-summary')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

export const fetchFinancialSummary = async () => {
  return api
    .get('/dashboard/financial-summary')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

export const fetchMonthlyFinancialHistory = async () => {
  return api
    .get('/dashboard/monthly-summary')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

export const fetchOldInventoryReport = async () => {
  return api
    .get('/dashboard/old-inventory')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

export const fetchRecentActivity = async () => {
  return api
    .get('/dashboard/recent')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

export const fetchTopSellingQuarterly = async () => {
  return api
    .get('/dashboard/top-selling')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}
