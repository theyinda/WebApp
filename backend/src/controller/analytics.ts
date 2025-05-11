import { Request, Response } from 'express';
import prisma from '../config/db';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears } from "date-fns";

// Admin only
// Total Revenue
export const analytics = async (req: Request, res: Response) => {
    // const PORT = process.env.PORT || 8000;
    const token = req.cookies.token;

    console.log(token, 'token get orders')

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const { range } = req.query;

        let startDate: Date | undefined;
        let endDate: Date | undefined;

        const now = new Date();

        // Set date range based on filter
        switch (range) {
            case "this_month":
                startDate = startOfMonth(now);
                endDate = endOfMonth(now);
                break;
            case "last_month":
                const lastMonth = subMonths(now, 1);
                startDate = startOfMonth(lastMonth);
                endDate = endOfMonth(lastMonth);
                break;
            case "this_year":
                startDate = startOfYear(now);
                endDate = endOfYear(now);
                break;
            case "last_year":
                const lastYear = subYears(now, 1);
                startDate = startOfYear(lastYear);
                endDate = endOfYear(lastYear);
                break;
            default:
                // If no filter or unknown filter, return all-time data
                startDate = undefined;
                endDate = undefined;
        }

        // Build the filter for Prisma query
        const dateFilter = startDate && endDate ? {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        } : {};

        // Revenue
        const revenue = await prisma.order.aggregate({
            _sum: {
                price: true,
            },
            where: dateFilter
        });

        // Orders Count
        const orderCount = await prisma.order.count({
            where: dateFilter
        });

        // Unique Customers
        const customers = await prisma.user.findMany({
            where: dateFilter,
            select: {
                id: true,
            },
            distinct: ['id'],
        });

        res.json({
            totalRevenue: revenue._sum.price || 0,
            orderCount,
            customerCount: customers.length
        });

    } catch (error) {
        console.error("Error in analytics:", error);
        res.status(500).json({ error: "Error fetching analytics data" });
    }
}
