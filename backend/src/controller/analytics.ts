import { Request, Response } from 'express';
import prisma from '../config/db';

// Admin only
// Total Revenue
export const revenue = async (req: Request, res: Response) => {
    try {
        const result = await prisma.order.aggregate({
            _sum: {
                price: true,
            },
        });
        res.json({ totalRevenue: result._sum.price || 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching revenue' });
    }
};

// Order Count
export const orders = async (req: Request, res: Response) => {
    try {
        const count = await prisma.order.count();
        res.json({ orderCount: count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order count' });
    }
};
// Unique Customer Count
export const customer = async (req: Request, res: Response) => {
    try {
        const count = await prisma.order.findMany({
            select: {
                customerId: true,
            },
            distinct: ['customerId'],
        });

        res.json({ customerCount: count.length });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer count' });
    }
};