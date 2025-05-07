import express from 'express';
import {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} from '../controller/order';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

// Create (Admin + Customer)
router.post('/', authenticate as any, createOrder as any);

// Read / Update / Delete — Admin only
router.get('/', authenticate as any, authorizeRoles('ADMIN') as any, getAllOrders as any);
router.patch('/:id', authenticate as any, authorizeRoles('ADMIN') as any, updateOrder as any);
router.delete('/:id', authenticate as any, authorizeRoles('ADMIN') as any, deleteOrder as any);

export default router;
