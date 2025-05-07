import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import orderRoutes from './routes/order';
import analyticsRoutes from './routes/analytics';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const randomString = uuidv4();
console.log(randomString);

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
