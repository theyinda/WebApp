import { Request, Response } from "express";
import prisma from "../config/db";
import {
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    subMonths,
    subYears,
} from "date-fns";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        name: string;
        role: string;
    };
}



export const createOrder = async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const { productName, productCategory, price, orderDate } = req.body;
        if (!user) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const customerName = user.name;

        const order = await prisma.order.create({
            data: {
                // customer: user.name,
                productName,
                productCategory,
                price: parseFloat(price),
                orderDate: new Date(orderDate),
                customerId: user.userId,
            },
        });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create order" });
    }
};

// Get All Orders (Admin only)
export const getAllOrders = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    console.log(token, "token get orders");

    if (!token) return res.status(401).json({ message: "Unauthorized" });
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

        const dateFilter =
            startDate && endDate
                ? {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                }
                : {};

        const orders = await prisma.order.findMany({ where: dateFilter });
        const totalOrders = await prisma.order.count({ where: dateFilter });
        return res.json({
            data: orders,
            total: totalOrders,
        });
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    console.log(token, "token create orders");

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    const { productName, productCategory, price, orderDate } = req.body;
    const order = await prisma.order.update({
        where: { id },
        data: {
            productName,
            productCategory,
            price: parseFloat(price),
            orderDate: new Date(orderDate),
        },
    });

    return res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    console.log(token, "token create orders");

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    await prisma.order.delete({ where: { id } });

    return res.status(204).send();
};
