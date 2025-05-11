import { Request, Response } from "express";
import prisma from "../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const customers = await prisma.user.findMany({
            where: { role: "CUSTOMER" },
            select: { id: true, name: true },
        });

        return res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
