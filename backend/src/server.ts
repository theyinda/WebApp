import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';
import analyticsRoutes from './routes/analytics';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';





dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:3001", "https://webapp-9idh.onrender.com", "https://web-app-tawny-pi.vercel.app"];


app.use((req, res, next) => {
    console.log("Incoming Origin:", req.headers.origin);
    next();
});

app.use(cors({
    origin: (origin, callback) => {
        console.log("CORS Check Origin:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(cookieParser());


app.use(express.json());
const randomString = uuidv4();
console.log(randomString);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
