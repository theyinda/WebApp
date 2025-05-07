import express from 'express';
import { customer, orders, revenue } from '../controller/analytics';
import { authorizeRoles } from '../middlewares/roles';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/customer', authenticate as any, authorizeRoles('ADMIN') as any, customer as any);
router.get('/revenue', authenticate as any, authorizeRoles('ADMIN') as any, revenue as any);
router.get('/orders', authenticate as any, authorizeRoles('ADMIN') as any, orders as any);

export default router;

