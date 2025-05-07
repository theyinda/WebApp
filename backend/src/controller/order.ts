import { Request, Response } from 'express';
import prisma from '../config/db';

// Create Order
export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log(req.body, req?.user, 'got hahaaj')
        const { productName, productCategory, price, orderDate } = req.body;
        // Ensure req.user is available after authentication
        if (!req.user) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const customerName = req.user.name;  // Access authenticated user's name
        const customerId = req.user.userId;  // Access authenticated user's id

        const order = await prisma.order.create({
            data: {
                customer: customerName,
                productName,
                productCategory,
                price: parseFloat(price),
                orderDate: new Date(orderDate),
                customerId: req.user.userId,
            },
        });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create order' });
    }
};

// Get All Orders (Admin only)
export const getAllOrders = async (_req: Request, res: Response) => {
    const orders = await prisma.order.findMany();
    return res.json(orders);
};

// Update Order (Admin only)
export const updateOrder = async (req: Request, res: Response) => {
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

// Delete Order (Admin only)
export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.order.delete({ where: { id } });

    return res.status(204).send();
};
