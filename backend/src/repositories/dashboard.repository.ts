import { prisma } from '@/config/prisma'
import type {
  MonthlyFinancialHistory,
  OldStockVehicle,
  RecentActivity,
  StockSummary,
  TopSellingQuarterly,
} from '@/types/dashboard.types'

export class DashboardRepository {
  constructor() {}

  async getStockSummary() {
    const result = await prisma.$queryRaw<
      [{ inStock: number; reserved: number; sold: number; total: number }]
    >`
      SELECT
        COUNT(*) FILTER (WHERE stock_status = 'in_stock')::INT AS "inStock",
        COUNT(*) FILTER (WHERE stock_status = 'reserved')::INT AS "reserved",
        COUNT(*) FILTER (WHERE stock_status = 'sold')::INT AS "sold",
        COUNT(*)::INT AS "total"
      FROM vehicles;
    `
    return result[0]
  }

  async getFinancialSummary() {
    return await prisma.vehicle.aggregate({
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
  }

  async getMonthlyFinancialHistory() {
    return await prisma.$queryRaw<Array<MonthlyFinancialHistory>>`
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

  async getTopSellingQuarterly() {
    return await prisma.$queryRaw<Array<TopSellingQuarterly>>`
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

  async getOldStockVehicles(ninetyDaysAgo: Date) {
    return await prisma.vehicle.findMany({
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
  }

  async getRecentActivities(limit: number = 5) {
    return await prisma.vehicle.findMany({
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
  }
}
