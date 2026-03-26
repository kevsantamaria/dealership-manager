import { prisma } from '@/lib/prisma'

export const getVehiclesStockSummaryService = async () => {
  const summaryVehicles = await prisma.$queryRaw<
    [{ inStock: number; reserved: number; sold: number; total: number }]
  >`
      SELECT
        COUNT(*) FILTER (WHERE stock_status = 'in_stock')::INT AS "inStock",
        COUNT(*) FILTER (WHERE stock_status = 'reserved')::INT AS "reserved",
        COUNT(*) FILTER (WHERE stock_status = 'sold')::INT AS "sold",
        COUNT(*) AS "total"
      FROM vehicles;
    `
  return summaryVehicles[0]
}

export const getFinancialSummaryService = async () => {
  const aggregate = await prisma.vehicle.aggregate({
    where: {
      stockStatus: {
        not: 'sold',
      },
    },
    _sum: {
      purchasePrice: true,
      suggestedPrice: true,
    },
  })

  const purchasePriceTotal = Number(aggregate._sum.purchasePrice || 0)
  const suggestedPriceTotal = Number(aggregate._sum.suggestedPrice || 0)
  const revenue = suggestedPriceTotal - purchasePriceTotal

  return {
    purchasePriceTotal,
    suggestedPriceTotal,
    revenue,
  }
}

export const getMonthlyFinancialHistoryService = async () => {
  return await prisma.$queryRaw<
    Array<{
      month: string
      totalPurchased: number
      totalSoldRevenue: number
    }>
  >`
    SELECT
      to_char(mes, 'YYYY-MM') AS "month",
      COALESCE(SUM(purchase_price), 0)::FLOAT AS "totalPurchased",
      COALESCE(
        SUM(suggested_price) FILTER (WHERE stock_status = 'sold'),
        0
      )::FLOAT AS "totalSoldRevenue"
    FROM
      generate_series(
        date_trunc('month', CURRENT_DATE) - interval '11 months',
        date_trunc('month', CURRENT_DATE),
        '1 month'
      ) AS mes
    LEFT JOIN vehicles ON date_trunc('month', arrival_date) = mes
    GROUP BY mes
    ORDER BY mes ASC;
  `
}

export const getTopSellingQuarterlyService = async () => {
  return await prisma.$queryRaw<
    Array<{
      brand: string
      model: string
      trim: string
      unitsSold: number
      revenue: number
    }>
  >`
      SELECT
        b.name AS "brand",
        m.name AS "model",
        t.name AS "trim",
        COUNT(v.id)::INT AS "unitsSold",
        SUM(v.suggested_price)::FLOAT AS "revenue"
      FROM
        vehicles v
      JOIN trims t ON v.trim_id = t.id
      JOIN models m ON t.model_id = m.id
      JOIN brands b ON m.brand_id = b.id
      WHERE
        v.stock_status = 'sold'
        AND v.arrival_date >= CURRENT_DATE - INTERVAL '3 months'
      GROUP BY
        b.id, b.name, m.id, m.name, t.id, t.name
      ORDER BY
        "unitsSold" DESC, "revenue" DESC
      LIMIT 5;
    `
}

export const getOldInventoryReportService = async () => {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  const vehicles = await prisma.vehicle.findMany({
    where: {
      stockStatus: 'in_stock',
      arrivalDate: {
        lte: ninetyDaysAgo,
      },
    },
    select: {
      arrivalDate: true,
      suggestedPrice: true,
      trim: {
        select: {
          name: true,
          model: {
            select: {
              name: true,
              brand: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
    orderBy: {
      arrivalDate: 'asc',
    },
  })

  const today = new Date()

  return vehicles.map((v) => ({
    brand: v.trim.model.brand.name,
    model: v.trim.model.name,
    trim: v.trim.name,
    arrivalDate: v.arrivalDate,
    suggestedPrice: Number(v.suggestedPrice),
    daysInStock: Math.floor(
      (today.getTime() - v.arrivalDate.getTime()) / (1000 * 60 * 60 * 24)
    ),
  }))
}

export const getRecentActivityService = async (limit: number = 5) => {
  const activities = await prisma.vehicle.findMany({
    take: limit,
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      stockStatus: true,
      updatedAt: true,
      trim: {
        select: {
          name: true,
          model: {
            select: {
              name: true,
              brand: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  })

  return activities.map((v) => ({
    vehicleName: `${v.trim.model.brand.name} ${v.trim.model.name} (${v.trim.name})`,
    status: v.stockStatus,
    date: v.updatedAt,
  }))
}
