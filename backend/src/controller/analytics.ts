import { Request, Response } from 'express';
import prisma from '../config/db';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears } from "date-fns";


export const analytics = async (req: Request, res: Response) => {

    const token = req.cookies.token;


    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const { range } = req.query;

        let startDate: Date | undefined;
        let endDate: Date | undefined;

        const now = new Date();

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
                startDate = undefined;
                endDate = undefined;
        }

        const dateFilter = startDate && endDate ? {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        } : {};

        const revenue = await prisma.order.aggregate({
            _sum: {
                price: true,
            },
            where: dateFilter
        });


        const orderCount = await prisma.order.count({
            where: dateFilter
        });

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
