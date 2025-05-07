import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface DecodedToken {
    id: string;
    email: string;
    role: "ADMIN" | "CUSTOMER";
}
dotenv.config();
export const authenticate = (
    req: Request & { user?: DecodedToken },
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    return res.status(401).json({ message: "No token provided" });
}

const token = authHeader.split(" ")[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded;
    next();
} catch (err) {
    return res.status(401).json({ message: "Invalid token" });
}
};
