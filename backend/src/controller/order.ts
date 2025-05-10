import { Request, Response } from 'express';
import prisma from '../config/db';
import dotenv from 'dotenv';


dotenv.config();

// Create Order
export const createOrder = async (req: Request, res: Response) => {
    console.log('got here ooo')
    const token = req.cookies.token;

    console.log(token, 'token create orders')

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        console.log(req.body, req?.user, 'got hahaaj')
        const { productName, productCategory, price, orderDate } = req.body;
        // Ensure req.user is available after authentication
        if (!req.user) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const customerName = req.user.name;  // Access authenticated user's name

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
export const getAllOrders = async (req: Request, res: Response) => {
    // const PORT = process.env.PORT || 8000;
    const token = req.cookies.token;

    console.log(token, 'token get orders')

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        // const user = jwt.verify(token, process.env.JWT_SECRET as string);
        // user is now decoded { id, email, ... }

        const orders = await prisma.order.findMany();
        const totalOrders = await prisma.order.count();
        return res.json({
            data: orders,
            total: totalOrders,
        });
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }

};

// Update Order (Admin only)
export const updateOrder = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    console.log(token, 'token create orders')

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const { id } = req.params;
    const { productName, productCategory, price, orderDate } = req.body
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
    const token = req.cookies.token;

    console.log(token, 'token create orders')

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const { id } = req.params;
    await prisma.order.delete({ where: { id } });

    return res.status(204).send();
};
